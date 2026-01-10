
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from './Modal';

const appointmentSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  phone: yup.string().required('Phone number is required'),
  time: yup.string().required('Preferred time is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  comment: yup.string().required('Please leave a comment'),
});

const AppointmentModal = ({ isOpen, onClose, psychologist }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(appointmentSchema)
  });

  const onSubmit = (data) => {
    console.log('Appointment submitted:', data, 'for', psychologist.name);
    alert('Thank you! Your appointment request has been sent.');
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Make an appointment with a psychologist">
      <p className="text-gray-500 mb-8">
        You are booking a session with <span className="text-emerald-600 font-semibold">{psychologist.name}</span>. 
        Please fill out the form below and we will contact you.
      </p>

      <div className="flex items-center space-x-4 mb-8 p-3 bg-gray-50 rounded-2xl">
        <img src={psychologist.avatar_url} alt="" className="w-12 h-12 rounded-xl object-cover" />
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Your psychologist</p>
          <p className="font-semibold text-slate-800">{psychologist.name}</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <input
              {...register('name')}
              placeholder="Name"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div>
                <input
                  {...register('phone')}
                  placeholder="+380"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
             </div>
             <div>
                <input
                  {...register('time')}
                  type="time"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
             </div>
          </div>

          <div>
            <input
              {...register('email')}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <textarea
              {...register('comment')}
              placeholder="Comment"
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none"
            />
            {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment.message}</p>}
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-emerald-600 text-white rounded-3xl font-bold text-lg hover:bg-emerald-700 transition mt-4 shadow-lg shadow-emerald-100"
        >
          Send
        </button>
      </form>
    </Modal>
  );
};

export default AppointmentModal;
