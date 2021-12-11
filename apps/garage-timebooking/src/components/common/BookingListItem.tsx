import React, { useContext, useEffect, useRef, useState } from 'react';
import { format, isSameDay } from 'date-fns';
import { Button, Popconfirm, Spin, Typography } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { apiClient, BookingWithUser } from '@my-garage/common';
import { useMutation, useQueryClient } from 'react-query';
import { AuthContext } from 'src/contexts/AuthContext';
import ListItem from './ListItem';

const Root = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.06);
`;

const CenteredSpin = styled(Spin)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ItemContent = styled.div`
  overflow: hidden;
  padding: var(--padding-m);
  max-height: 100%;
  min-height: 0;
`;
const formatTime = (start: Date, end: Date) => {
  if (isSameDay(start, end)) {
    return `${format(start, 'eeee dd MMMM HH:mm')} - ${format(end, 'HH:mm')}`;
  }
  return `${format(start, 'eeee dd MMMM HH:mm')} - ${format(end, 'eeee dd MMMM HH:mm')}`;
};

const useDeleteBooking = (bookingId: string) => {
  const { token } = useContext(AuthContext);
  const client = useQueryClient();
  const { mutate: deleteBooking, ...rest } = useMutation(
    ['delete-booking', bookingId],
    () =>
      apiClient.delete(`/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    {
      onSuccess: () => {
        client.invalidateQueries('my-bookings');
      },
    },
  );

  return {
    deleteBooking,
    ...rest,
  };
};

interface Props {
  booking: BookingWithUser;
  allowDelete?: boolean;
}

const BookingListItem = ({ booking, allowDelete = true }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteBooking, isLoading } = useDeleteBooking(booking.id);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { state } = useLocation();

  useEffect(() => {
    if (!state) return;

    const typedState = state as BookingWithUser;

    if (typedState.id !== booking.id) return;

    setIsOpen(true);

    if (containerRef.current) {
      containerRef.current.scrollIntoView();
    }
  }, [state, booking.id]);

  return (
    <Root>
      {isLoading && (
        <Overlay>
          <CenteredSpin size="large" />
        </Overlay>
      )}
      <ListItem
        imageUrl={booking.thing.imageUrl}
        title={booking.thing.name}
        description={formatTime(booking.startAt, booking.endAt)}
        onClick={() => {
          setIsOpen((current) => !current);
        }}
        isSelected={isOpen}
        containerRef={containerRef}
      />
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            transition={{
              ease: 'easeOut',
              duration: 0.3,
            }}
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
          >
            <ItemContent>
              <dl>
                <dt>
                  <Typography.Title level={5}>Time</Typography.Title>
                </dt>
                <dd>
                  <Typography.Paragraph>
                    {formatTime(booking.startAt, booking.endAt)}
                  </Typography.Paragraph>
                </dd>
                <dt>
                  <Typography.Title level={5}>Description</Typography.Title>
                </dt>
                <dd>
                  <Typography.Paragraph>{booking.thing.description}</Typography.Paragraph>
                </dd>
                <dt>
                  <Typography.Title level={5}>Contact person</Typography.Title>
                </dt>
                <dd>
                  <Typography.Paragraph>
                    {booking.thing.contactPerson.fullName}{' '}
                    <a href={`mailto:${booking.thing.contactPerson.email}`}>
                      {booking.thing.contactPerson.email}
                    </a>
                  </Typography.Paragraph>
                </dd>
                {allowDelete && (
                  <>
                    <dt>
                      <Typography.Title level={5}>Actions</Typography.Title>
                    </dt>
                    <dd>
                      <Popconfirm
                        title="Sure you want to cancel this booking?"
                        okText="Yes"
                        okType="danger"
                        cancelText="No"
                        onConfirm={() => deleteBooking()}
                      >
                        <Button danger>Cancel</Button>
                      </Popconfirm>
                    </dd>
                  </>
                )}
              </dl>
            </ItemContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Root>
  );
};

export default BookingListItem;
