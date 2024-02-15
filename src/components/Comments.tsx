import { useRef } from 'react';
import { useForm } from "../hooks/formHooks";
import { useUserContext } from "../hooks/ContextHooks";
import { useCommentStore } from '../store';
import { MediaItemWithOwner } from '../types/DBTypes';

const Comments = ({item}: {item : MediaItemWithOwner}) => {
  const { user } = useUserContext();
  const { comments, addComment } = useCommentStore();
  const formRef = useRef<HTMLFormElement>(null);

  const initValues = { comment_text: '' };



  const doComment = async () => {
    if (!user) {
      return;
    }
    addComment({
      comment_text: inputs.comment_text,
      media_id: item.media_id,
      user_id: user.user_id,
      username: user.username,
    })
    if (formRef.current) formRef.current.reset();
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(doComment, initValues);

  console.log(comments)

  return (
    <>
      {user && (
    <>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="flex w-4/5">
        <div>
          <label htmlFor="comment">Comment</label>
          <input
            className="text-white"
            name="comment_text"
            type="text"
            id="comment"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
        </div>
      </form>
    </>
      )}
      <h3 className='text-3x1'>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id}>{comment.username}: {comment.comment_text}</li>
        ))}
      </ul>
    </>
  );
};

export default Comments;
