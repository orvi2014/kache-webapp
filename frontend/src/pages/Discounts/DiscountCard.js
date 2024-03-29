import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { generatePath, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useApolloClient } from '@apollo/client';

import Comment from 'components/Comment';
import CreateComment from 'components/CreateComment';
import Like from 'components/Like';
import { DotsIcon, PostCommentIcon } from 'components/icons';
import { Spacing } from 'components/Layout';
import { H3 } from 'components/Text';
import { Button } from 'components/Form';
import PostCardOption from 'components/PostCard/PostCardOption';
import Modal from 'components/Modal';
import Avatar from 'components/Avatar';

import { GET_DISCOUNTS } from 'graphql/discount';

import { HOME_PAGE_POSTS_LIMIT, PROFILE_PAGE_POSTS_LIMIT } from 'constants/DataLimit';

import { useStore } from 'store';

import * as Routes from 'routes';

import { timeAgo } from 'utils/date';

const Root = styled.div`
  width: 100%;
  border-radius: ${(p) => p.theme.radius.sm};
  padding-bottom: ${(p) => p.theme.spacing.xs};
  background-color: ${(p) => p.theme.colors.white};
  border: 1px solid ${(p) => p.theme.colors.border.main};
`;

const A = styled.div`
text-decoration: none;
transition: color 0.1s;
display: inline-block;
color: blue;
`;
const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${(p) => p.theme.spacing.xs} ${(p) => p.theme.spacing.sm};
`;

const CreatedAt = styled.div`
  font-size: ${(p) => p.theme.font.size.xxs};
  color: ${(p) => p.theme.colors.text.hint};
  border-bottom: 1px solid ${(p) => p.theme.colors.text.secondary};
  border: 0;
  margin-top: 2px;
`;

const Author = styled(A)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Name = styled.span`
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.colors.primary.main};
`;

const Poster = styled.img`
  display: block;
  width: 100%;
  max-height: 700px;
  object-fit: cover;
  cursor: pointer;
  margin-bottom: ${(p) => p.theme.spacing.sm};
`;

const Title = styled.div`
  word-break: break-word;
  white-space: pre-line;
`;

const BottomRow = styled.div`
  overflow: hidden;
`;

const CountAndIcons = styled.div`
  padding: 0 ${(p) => p.theme.spacing.sm};
`;

const Count = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${(p) => p.theme.spacing.xs};
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.colors.text.secondary};
`;

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${(p) => p.theme.colors.border.main};
`;

const Comments = styled.div`
  padding: 0 ${(p) => p.theme.spacing.sm};
`;

const StyledButton = styled(Button)`
  padding: 0;
  padding-left: 4px;
  font-size: ${(p) => p.theme.font.size.xxs};
`;

const CommentLine = styled.div`
  margin-bottom: 5px;
  border-top: 1px solid ${(p) => p.theme.colors.border.main};
`;

/**
 * Component for rendering user post
 */
const DiscountCard = ({ imagePublicId,creator, title, createdAt, image,link, postId, openModal }) => {
  const [{ auth }] = useStore();
  const client = useApolloClient();
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const toggleCreateComment = () => {
    setIsCommentOpen(true);
  };

  const toggleComment = () => {
    setIsCommentOpen(!isCommentOpen);
  };

  const closeOption = () => setIsOptionOpen(false);

  const openOption = () => setIsOptionOpen(true);

  const deletePost = async () => {
    try {
      await client.mutate({
        refetchQueries: () => [
          {
            query: GET_DISCOUNTS,
          },
        ],
      });
    } catch (err) {}

    setIsOptionOpen(false);
  };

  return (
    <>
      <Root>
        <Modal onClose={closeOption} open={isOptionOpen}>
          <PostCardOption postId={postId} closeOption={closeOption} author={creator} deletePost={deletePost} />
        </Modal>

        <TopRow>
          <Author
          >
            <Avatar image={image} />

            <Spacing left="xs">
              <Name>{creator}</Name>
              <CreatedAt>{timeAgo(createdAt)}</CreatedAt>
            </Spacing>
          </Author>
        </TopRow>

        <Spacing left="sm" bottom="sm" top="xs" right="sm">
          <Title>
            <H3>{title}</H3>            
          </Title>
          <A>
          <a href={link}
            style={{ color: 'inherit', textDecoration: 'inherit'}}
            target="_blank">
            {link}
            </a>
          </A>
        </Spacing>
        {imagePublicId && <Poster src={imagePublicId} onClick={openModal} />}

        <BottomRow>
          {/* <CountAndIcons> */}
            {/* <Count>
              {likes.length} likes
              <Spacing />
              <StyledButton onClick={toggleComment} text>
                {comments.length} comments
              </StyledButton>
            </Count> */}

            {/* <Icons>
              <Like fullWidth withText user={author} postId={postId} likes={likes} />

              <Button fullWidth text onClick={toggleCreateComment}>
                <PostCommentIcon /> <Spacing inline left="xxs" /> <b>Comment</b>
              </Button>
            </Icons> */}
          {/* </CountAndIcons> */}

          {/* {isCommentOpen && (
            <>
              <Spacing top="xs">
                <CommentLine />
                <CreateComment post={{ id: postId, author }} focus={isCommentOpen} />
              </Spacing>

              {comments.length > 0 && <CommentLine />}

              <Comments>
                {comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} postId={postId} postAuthor={author} />
                ))}
              </Comments>
            </>
          )} */}
        </BottomRow>
      </Root>
    </>
  );
};

DiscountCard.propTypes = {
  author: PropTypes.object,
  creator: PropTypes.string,
  imagePublicId: PropTypes.string,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  likes: PropTypes.array.isRequired,
  comments: PropTypes.array,
  createdAt: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default DiscountCard;
