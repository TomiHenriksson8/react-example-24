import { useEffect, useRef } from 'react';
import { useForm } from "../hooks/formHooks";
import { useUserContext } from "../hooks/ContextHooks";
import { useCommentStore } from '../store';
import { MediaItemWithOwner } from '../types/DBTypes';
import { useComment } from '../hooks/apiHooks';

const Comments = ({item}: {item : MediaItemWithOwner}) => {
  const { user } = useUserContext();
  const { comments, addComment, setComments } = useCommentStore();
  const formRef = useRef<HTMLFormElement>(null);
  const { getCommentsByMediaId, postComment } = useComment();

  const initValues = { comment_text: '' };



  const doComment = async () => {
    const token = localStorage.getItem('token');
    if (!user || !token) {
      return;
    }
    try {
      await postComment(inputs.comment_text, item.media_id, token);
      await getComments()
    } catch (e) {
      console.error((e as Error).message);
    }
    if (formRef.current) formRef.current.reset();
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(doComment, initValues);

  const getComments = async () => {
    try {
      const comments =  await getCommentsByMediaId(item.media_id);
      setComments(comments);
    } catch (error) {
      console.error(error);
      setComments([]);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

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
      {comments.length > 0 && (

<>

  <h3 className="text-xl">Comments</h3>

  <ul>

    {comments.map((comment) => (

      <li key={comment.comment_id}>

        <div className="rounded-md border border-slate-200 bg-slate-800 p-3 text-slate-100">

          <span className="font-bold text-slate-200">

            On{' '}

            {new Date(comment.created_at!).toLocaleDateString('fi-FI')}{' '}

          </span>

          <span className="font-bold text-slate-200">

            {comment.username} wrote:

          </span>

          <span className="ml-2">{comment.comment_text}</span>

        </div>

      </li>

    ))}

  </ul>

</>

)}
    </>
  );
};

export default Comments;
