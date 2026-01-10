import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { X, Calendar, Clock, User, MessageSquare } from 'lucide-react';

const schema = yup.object().shape({
  date: yup.string().required('Please select a date'),
  time: yup.string().required('Please select a time'),
  name: yup.string().required('Name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  message: yup.string(),
});

const AppointmentModal = ({ isOpen, onClose, psychologist }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: '',
      time: '',
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  });

  // Handle modal close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSubmitError('');

    try {
      // Mock appointment booking - in real app, this would send to backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      alert(`Appointment booked successfully with ${psychologist.name} on ${data.date} at ${data.time}`);
      onClose();
      reset();
    } catch (error) {
      setSubmitError('Failed to book appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={psychologist.avatar_url}
              alt={psychologist.name}
              onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/128x128?text=No+Image'; e.currentTarget.onerror = null }}
              className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500/20"
            />
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Book Appointment</h2>
              <p className="text-emerald-600 font-semibold">with {psychologist.name}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User size={16} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-gray-600">Specialization</p>
                  <p className="font-semibold text-slate-800">{psychologist.specialization}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Clock size={16} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-gray-600">Experience</p>
                  <p className="font-semibold text-slate-800">{psychologist.experience}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Calendar size={16} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-gray-600">Price per hour</p>
                  <p className="font-semibold text-slate-800">${psychologist.price_per_hour}</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  {...register('date')}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.date ? 'border-red-300' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <select
                  {...register('time')}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.time ? 'border-red-300' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                >
                  <option value="">Select time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
                {errors.time && (
                  <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register('name')}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.name ? 'border-red-300' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? 'border-red-300' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                {...register('phone')}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.phone ? 'border-red-300' : 'border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (Optional)
              </label>
              <textarea
                {...register('message')}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                placeholder="Tell us about your concerns or what you'd like to discuss..."
              />
            </div>

            {submitError && (
              <p className="text-red-500 text-sm text-center">{submitError}</p>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <MessageSquare size={20} className="text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-blue-900 mb-1">What happens next?</p>
                  <p className="text-blue-700">
                    After booking, {psychologist.name} will contact you within 24 hours to confirm the appointment and provide any additional information needed.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Booking...' : 'Book Appointment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;