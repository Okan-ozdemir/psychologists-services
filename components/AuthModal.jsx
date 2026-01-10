
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from './Modal';
import { mockAuth } from '../services/mockFirebase';
import { Loader2 } from 'lucide-react';

const schema = yup.object().shape({
  name: yup.string().when('mode', {
    is: 'register',
    then: (s) => s.required('Name is required'),
    otherwise: (s) => s.notRequired(),
  }),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const AuthModal = ({ isOpen, onClose, mode, onAuthSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    context: { mode }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const user = mode === 'register' 
        ? await mockAuth.register(data) 
        : await mockAuth.login(data);
      onAuthSuccess(user);
      onClose();
      reset();
    } catch (err) {
      alert("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const title = mode === 'login' ? 'Log In' : 'Registration';
  const subtitle = mode === 'login' 
    ? 'Enter your credentials to access your account and favorite specialists.' 
    : 'Join our community of users to find and save the best psychologists for your needs.';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-gray-500 mb-8 text-sm leading-relaxed">{subtitle}</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {mode === 'register' && (
          <div>
            <input
              {...register('name')}
              placeholder="Full Name"
              disabled={isLoading}
              className="w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-gray-50/30"
            />
            {errors.name && <p className="text-red-500 text-[10px] mt-1.5 ml-1 font-medium">{errors.name.message}</p>}
          </div>
        )}
        
        <div>
          <input
            {...register('email')}
            placeholder="Email Address"
            disabled={isLoading}
            className="w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-gray-50/30"
          />
          {errors.email && <p className="text-red-500 text-[10px] mt-1.5 ml-1 font-medium">{errors.email.message}</p>}
        </div>

        <div>
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            disabled={isLoading}
            className="w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-gray-50/30"
          />
          {errors.password && <p className="text-red-500 text-[10px] mt-1.5 ml-1 font-medium">{errors.password.message}</p>}
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-emerald-600 text-white rounded-[30px] font-bold text-lg hover:bg-emerald-700 active:scale-[0.98] transition-all mt-4 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-emerald-100"
        >
          {isLoading && <Loader2 size={20} className="animate-spin" />}
          <span>{mode === 'login' ? 'Log In' : 'Sign Up'}</span>
        </button>
      </form>
    </Modal>
  );
};

export default AuthModal;
