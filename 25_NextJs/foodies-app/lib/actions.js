'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';
import { isInvalidEmail, isInvalidImage, isInvalidText } from '@/utils/helpers';

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidEmail(meal.creator_email) ||
    isInvalidImage(meal.image)
  ) {
    return {
      message: 'Invalid input meal data!',
      values: meal,
    };
  }

  await saveMeal(meal);
  redirect('/meals');
}
