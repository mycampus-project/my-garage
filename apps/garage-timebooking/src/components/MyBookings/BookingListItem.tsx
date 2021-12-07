import React, { useEffect, useRef, useState } from 'react';
import { format, isSameDay } from 'date-fns';
import { Button, Popconfirm, Typography } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { BookingWithUser } from '@my-garage/common';
import ListItem from '../common/ListItem';

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

const BookingListItem = ({ item }: { item: BookingWithUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { state } = useLocation();

  useEffect(() => {
    if (!state) return;

    const typedState = state as BookingWithUser;

    if (typedState.id !== item.id) return;

    setIsOpen(true);

    if (containerRef.current) {
      containerRef.current.scrollIntoView();
    }
  }, [state, item.id]);

  return (
    <>
      <ListItem
        imageUrl={item.thing.imageUrl}
        title={item.thing.name}
        description={formatTime(item.startAt, item.endAt)}
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
                    {formatTime(item.startAt, item.endAt)}
                  </Typography.Paragraph>
                </dd>
                <dt>
                  <Typography.Title level={5}>Description</Typography.Title>
                </dt>
                <dd>
                  <Typography.Paragraph>{item.thing.description}</Typography.Paragraph>
                </dd>
                <dt>
                  <Typography.Title level={5}>Contact person</Typography.Title>
                </dt>
                <dd>
                  <Typography.Paragraph>
                    {item.thing.contactPerson.fullName}{' '}
                    <a href={`mailto:${item.thing.contactPerson.email}`}>
                      {item.thing.contactPerson.email}
                    </a>
                  </Typography.Paragraph>
                </dd>
                <dt>
                  <Typography.Title level={5}>Actions</Typography.Title>
                </dt>
                <dd>
                  <Popconfirm
                    title="Sure you want to cancel this booking?"
                    okText="Yes"
                    okType="danger"
                    cancelText="No"
                  >
                    <Button danger>Cancel</Button>
                  </Popconfirm>
                </dd>
              </dl>
            </ItemContent>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BookingListItem;
