import React from 'react';
import { useForm } from 'react-hook-form';
import '../style/inquiry.css'
import useAuth from '../hooks/auth';

export default function inquiry() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  useAuth
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="First name" {...register("First name", {required: true, maxLength: 80})} />
      <input type="text" placeholder="Last name" {...register("Last name", {required: true, maxLength: 100})} />
      <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
      <input type="tel" placeholder="Mobile number" {...register("Mobile number", {required: true, minLength: 6, maxLength: 12})} />
      <input type="number" onWheel={(e) => e.target.blur()} placeholder="Quantity" {...register("Quantity", {required: true})} />

      <input type="submit" />
    </form>
  );
}