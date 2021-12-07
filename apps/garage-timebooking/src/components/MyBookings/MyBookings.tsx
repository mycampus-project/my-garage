import React, { useContext, useMemo, useState } from 'react';
import { apiClient, BookingWithUser } from '@my-garage/common';
import { groupBy } from 'lodash';
import { format, isSameDay, isThisWeek } from 'date-fns';
import { useQuery } from 'react-query';
import { AuthContext } from 'src/contexts/AuthContext';
import { mapBooking } from 'src/utils';
import styled from 'styled-components';
import { Button, Image, PageHeader, Popconfirm, Typography } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { isBetweenInclusive } from '../NewBooking/utils';
import Layout from '../common/Layout';
import ListItem from '../common/ListItem';
import ListSection from '../common/ListSection';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const CenteredLayout = styled.div`
  @media screen and (max-width: 992px) {
    padding: var(--padding-m);
  }
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: var(--padding-xl);
  width: 100%;
  height: 100%;
  min-height: 0;
`;

const Content = styled.div`
  width: 100%;
  max-width: 600px;
  max-height: 100%;
  background-color: white;
`;

const ItemContent = styled.div`
  overflow: hidden;
  padding: var(--padding-m);
  max-height: 100%;
  min-height: 0;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledPageHeader = styled(PageHeader)`
  flex: 1;
`;

const ImageContainer = styled.div`
  padding: var(--padding-m);
`;

const useMyBookings = () => {
  const { user, token } = useContext(AuthContext);

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery(['my-bookings', user], () => {
    if (!user) return null;

    return apiClient
      .get<{ items: Array<BookingWithUser & { startAt: string; endAt: string }> }>('/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: user.id,
          limit: 0,
          mode: 'future',
        },
      })
      .then((response) => response.data)
      .then(({ items, ...rest }) => ({
        ...rest,
        items: items.map((i) => mapBooking<BookingWithUser>(i)),
      }));
  });

  return { bookings, isLoading, error };
};

const formatTime = (start: Date, end: Date) => {
  if (isSameDay(start, end)) {
    return `${format(start, 'eeee dd MMMM HH:mm')} - ${format(end, 'HH:mm')}`;
  }
  return `${format(start, 'eeee dd MMMM HH:mm')} - ${format(end, 'eeee dd MMMM HH:mm')}`;
};

const groupings = ['Today', 'This week', 'Future'] as const;

const BookingItem = ({ item }: { item: BookingWithUser }) => {
  const [isOpen, setIsOpen] = useState(false);

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

function MyBookings() {
  const { bookings, isLoading } = useMyBookings();

  const groupedBookings = useMemo(() => {
    if (!bookings?.items) return null;

    return groupBy(bookings?.items, (booking): typeof groupings[number] => {
      const now = new Date();
      const isToday =
        isSameDay(now, booking.startAt) ||
        isSameDay(now, booking.endAt) ||
        isBetweenInclusive(now, [booking.startAt, booking.endAt]);

      if (isToday) return 'Today';

      const thisWeek = isThisWeek(booking.startAt);
      if (thisWeek) return 'This week';

      return 'Future';
    });
  }, [bookings]);

  return (
    <Root>
      <CenteredLayout>
        <Content>
          {groupedBookings &&
            Object.entries(groupedBookings).map(([type, itemsOfType]) => (
              <ListSection
                key={type}
                items={itemsOfType}
                listHeader={type}
                renderItem={(item) => <BookingItem item={item} />}
              />
            ))}
        </Content>
      </CenteredLayout>
    </Root>
  );

  return (
    <Layout
      isLoadingList={isLoading}
      listSections={groupedBookings}
      pageTitle="My bookings"
      renderItem={(item, isSelected, onClick) => (
        <ListItem
          title={item.thing.name}
          description={formatTime(item.startAt, item.endAt)}
          onClick={onClick}
          isSelected={isSelected}
        />
      )}
      renderContent={(selectedItem, clearSelection) =>
        selectedItem && (
          <>
            <HeaderRow>
              <StyledPageHeader
                title={`Booking of ${selectedItem?.thing.name}`}
                extra={
                  <Popconfirm
                    title="Sure you want to cancel this booking?"
                    okText="Yes"
                    okType="danger"
                    cancelText="No"
                  >
                    <Button danger>Cancel</Button>
                  </Popconfirm>
                }
                ghost
                onBack={clearSelection}
              />
              <ImageContainer>
                <Image
                  wrapperClassName="image"
                  width={200}
                  src={`${process.env.REACT_APP_BACKEND_URL}/static/${selectedItem.thing.imageUrl}`}
                />
              </ImageContainer>
            </HeaderRow>
            <Content>
              <dl>
                <dt>
                  <Typography.Title level={5}>Time</Typography.Title>
                </dt>
                <dd>
                  <Typography.Paragraph>
                    {formatTime(selectedItem.startAt, selectedItem.endAt)}
                  </Typography.Paragraph>
                </dd>
                <dt>
                  <Typography.Title level={5}>Description</Typography.Title>
                </dt>
                <dd>
                  <Typography.Paragraph>{selectedItem.thing.description}</Typography.Paragraph>
                </dd>
                <dt>
                  <Typography.Title level={5}>Contact person</Typography.Title>
                </dt>
                <dd>
                  <Typography.Paragraph>
                    {selectedItem.thing.contactPerson.fullName}{' '}
                    <a href={`mailto:${selectedItem.thing.contactPerson.email}`}>
                      {selectedItem.thing.contactPerson.email}
                    </a>
                  </Typography.Paragraph>
                </dd>
              </dl>
            </Content>
          </>
        )
      }
    />
  );
}

export default MyBookings;
