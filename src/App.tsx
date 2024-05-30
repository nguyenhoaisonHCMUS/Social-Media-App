import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Toaster } from '@/components/ui/toaster';

const AuthLayout = lazy(() => import('./layouts/AuthLayout'));
const RootLayout = lazy(() => import('./layouts/RootLayout'));
const SigninForm = lazy(() => import('./pages/_auth/SigninForm'));
const SignupForm = lazy(() => import('./pages/_auth/SignupForm'));
const Explore = lazy(() => import('./pages/root/Explore'));
const Home = lazy(() => import('./pages/root/Home'));
const Profile = lazy(() => import('./pages/root/profiles/Profile'));
const AllUsers = lazy(() => import('./pages/root/AllUsers'));
const Saved = lazy(() => import('./pages/root/Saved'));
const CreatePost = lazy(() => import('./pages/root/posts/CreatePost'));
const PostDetails = lazy(() => import('./pages/root/posts/PostDetails'));
const UpdateProfile = lazy(() => import('./pages/root/profiles/UpdateProfile'));
const UpdatePost = lazy(() => import('./pages/root/posts/UpdatePost'));
function App() {
    return (
        <>
            <main className=" h-screen">
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route element={<AuthLayout />}>
                            <Route path="/sign-in" element={<SigninForm />} />
                            <Route path="/sign-up" element={<SignupForm />} />
                        </Route>
                        <Route element={<RootLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/create-post" element={<CreatePost />} />
                            <Route path="/profile/:_id" element={<Profile />} />
                            <Route path="/profile/:_id/update" element={<UpdateProfile />} />
                            <Route path="/explore" element={<Explore />} />
                            <Route path="/all-users" element={<AllUsers />} />
                            <Route path="/saved" element={<Saved />} />
                            <Route path="/post/:_id" element={<PostDetails />} />
                            <Route path="/post/:_id/update" element={<UpdatePost />} />
                        </Route>
                    </Routes>

                    <Toaster />
                </Suspense>
            </main>
        </>
    );
}

export default App;
