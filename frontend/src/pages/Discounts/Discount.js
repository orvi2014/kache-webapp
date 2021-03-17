import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { generatePath } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Container } from 'components/Layout';
// import ExploreCard from '../Explore/ExploreCard';
import Skeleton from 'components/Skeleton';
import PostPopup from 'components/PostPopup';
import DiscountCard from './DiscountCard';
import Modal from 'components/Modal';
import InfiniteScroll from 'components/InfiniteScroll';
import Empty from 'components/Empty';
import { Loading } from 'components/Loading';
import Head from 'components/Head';

import { GET_DISCOUNTS } from 'graphql/discount';

import { EXPLORE_PAGE_POSTS_LIMIT } from 'constants/DataLimit';

import { useStore } from 'store';

import * as Routes from 'routes';

const Root = styled(Container)`
  margin-top: ${(p) => p.theme.spacing.lg};
  margin-bottom: ${(p) => p.theme.spacing.sm};

  @media (min-width: ${(p) => p.theme.screen.lg}) {
    margin-left: ${(p) => p.theme.spacing.lg};
    padding: 0;
  }
`;

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 3fr));
  grid-auto-rows: auto;
  grid-gap: 20px;
`;

/**
 * Explore page
 */
const Explore = () => {
  // const [{ auth }] = useStore();
  const [modalPostId, setModalPostId] = useState(null);
  const variables = {
    skip: 0,
    limit: EXPLORE_PAGE_POSTS_LIMIT,
  };
  const { data, loading, fetchMore, networkStatus } = useQuery(GET_DISCOUNTS, {
    variables,
  });

  const closeModal = () => {
    window.history.pushState('', '', '/discounts');
    setModalPostId(null);
  };

  const openModal = (postId) => {
    window.history.pushState('', '', generatePath(Routes.POST, { id: postId }));
    setModalPostId(postId);
  };

  const renderContent = () => {
    if (loading && networkStatus === 1) {
      return (
        <PostsContainer>
          <Skeleton height={300} count={EXPLORE_PAGE_POSTS_LIMIT} />
        </PostsContainer>
      );
    }

    const { discounts, count } = data.getDiscounts;
    if (!discounts.length > 0) return <Empty text="No discounts yet." />;

    return (
      <InfiniteScroll
        data={discounts}
        dataKey="getDiscounts.discounts"
        count={parseInt(count)}
        variables={variables}
        fetchMore={fetchMore}
      >
        {(data) => {
          const showNextLoading = loading && networkStatus === 3 && count !== data.length;

          return (
            <Fragment>
                {data.map((discount) => (
                  <Fragment key={discount.id}>
                    <Modal open={modalPostId === discount.id} onClose={closeModal}>
                      <PostPopup id={discount.id} closeModal={closeModal} />
                    </Modal>
                    <DiscountCard
                      // author={discount.author}
                      imagePublicId={discount.imagePublicId}
                      postId={discount.id}
                      comments={discount.comments}
                      createdAt={discount.createdAt}
                      title={discount.title}
                      image={discount.image}
                      likes={discount.likes}
                      creator={discount.creator}
                      openModal={() => openModal(discount.id)}
                    />
                  </Fragment>
                ))}

              {showNextLoading && <Loading top="lg" />}
            </Fragment>
          );
        }}
      </InfiniteScroll>
    );
  };

  return (
    <Root maxWidth="md">
      <Head title="Explore New Discounts" />

      {renderContent()}
    </Root>
  );
};

export default Explore;
