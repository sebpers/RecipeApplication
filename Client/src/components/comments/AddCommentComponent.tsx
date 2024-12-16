import React, { useState } from 'react'
import SubmitButtonComponent from '../common/buttons/SubmitButtonComponent';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/auth/useAuth';
import { addComment } from '../../services/commentService';
import SecondaryButtonComponent from '../common/buttons/SecondaryButtonComponent';

interface AddCommentProps {
    onCommentAdded(): void;
    onClickFunc(): void;
}

const AddCommentComponent = ({ onCommentAdded, onClickFunc  }: AddCommentProps) => {
    const [title, setTitle] = useState<string>('');
    const [comment, setComment] = useState<string>('');

    const { id } = useParams();
    const { user } = useAuth()

    const labelClass= 'block mb-2 text-sm font-medium text-gray-900 dark:text-white';

    const onHandleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        if (!id) {
            throw new Error("Recipe ID must be a valid number.");
        }

        const form = {
            title: title.trim(),
            description: comment.trim(),
            name: `${user?.firstName} ${user?.lastName}`,
            userId: user?.id,
            recipeId: parseInt(id)
        };

        await addComment(form);

        setTitle('');
        setComment('');

        onCommentAdded(); // Trigger comments refresh
        onClickFunc();
    }

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value: string = e.target.value;
        const formattedValue: string = value.charAt(0).toUpperCase() + value.slice(1);

        setTitle(formattedValue);
    }

    const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const value: string = e.target.value;
        const formattedValue: string = value.charAt(0).toUpperCase() + value.slice(1);

        setComment(formattedValue);
    }

    const onCancel = (): void => {
        onClickFunc()
    }

  return (
    <form className="mx-auto mt-5" onSubmit={onHandleSubmit}>
         <div className="mb-5">
            <label htmlFor="title" className={labelClass}>Title</label>
            <input
                type="title"
                id="title"
                value={title}
                onChange={onTitleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Add a title"
                required />
        </div>

        <div>
            <label htmlFor="comment" className={labelClass}>Comment</label>
            <textarea
                id="comment"
                value={comment}
                onChange={onCommentChange}
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a comment..." />
        </div>

        <div className="mt-5">
            <SubmitButtonComponent />
            <SecondaryButtonComponent onClickFunc={onCancel} text={'Cancel'}/>
        </div>
    </form>
  )
}

export default AddCommentComponent