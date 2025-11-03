
import React from 'react';

const Login = ({ setAuthView }) => {
  return (
    <div id="login-screen" className="auth-view max-w-md w-full">
      <h1 className="text-3xl font-bold text-slate-800 text-center mb-6">Create Your Account</h1>
      <div className="space-y-4">
        <button onClick={() => setAuthView('add-pet-wizard')} className="auth-method-btn w-full flex items-center justify-center gap-3 bg-white border border-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-lg hover:bg-slate-50 transition-colors">
          <svg className="h-5 w-5" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.519-3.486-11.187-8.264l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,35.617,44,29.972,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
          Continue with Google
        </button>
        <button onClick={() => setAuthView('add-pet-wizard')} className="auth-method-btn w-full flex items-center justify-center gap-3 bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors">
          <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M17.2,2.83c-1.26-1.25-2.92-1.9-4.79-1.82c-2.45,0.09-4.52,1.3-5.93,3.15c-1.5,1.96-2.03,4.34-1.51,6.78c0.41,1.93,1.52,3.63,3.03,4.72c-0.12,0.11-0.24,0.21-0.35,0.32c-2.4,2.4-4.8,4.8-7.2,7.21C0,22.75,0,22.75,0,23c0,0.55,0.45,1,1,1c0.25,0,0.5-0.1,0.68-0.27c2.4-2.4,4.8-4.8,7.2-7.2c0.12-0.12,0.22-0.24,0.34-0.35c1.1,1.52,2.8,2.62,4.73,3.04c2.44,0.52,4.83,0,6.78-1.51c1.86-1.41,3.06-3.48,3.15-5.93c0.08-1.87-0.57-3.53-1.82-4.79C20.66,3.31,18.4,2.05,17.2,2.83 M15.63,16.37c-1.43,1.43-3.76,1.43-5.19,0c-1.43-1.43-1.43-3.76,0-5.19c1.43-1.43,3.76-1.43,5.19,0C17.06,12.61,17.06,14.94,15.63,16.37 M19.34,6.74c-0.65,0.65-1.41,1.16-2.23,1.53c-0.3-0.69-0.67-1.34-1.12-1.95c-0.58-0.81-1.28-1.51-2.09-2.09c0.61-0.45,1.26-0.82,1.95-1.12c0.82-0.36,1.58-0.45,2.23-0.23c-0.21,0.65,0.01,1.41,0.66,2.06C19.33,5.55,19.34,6.74,19.34,6.74"></path></svg>
          Continue with Apple
        </button>
      </div>
      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-slate-300"></div>
        <span className="mx-4 text-slate-500 text-sm">or</span>
        <div className="flex-grow border-t border-slate-300"></div>
      </div>
      <form className="space-y-4" onSubmit={() => setAuthView('add-pet-wizard')}>
        <input type="email" placeholder="Email address" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
        <button type="submit" className="auth-method-btn w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-lg transition-colors">Continue with Email</button>
      </form>
    </div>
  );
};

export default Login;
