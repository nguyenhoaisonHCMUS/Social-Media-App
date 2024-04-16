import { Routes, Route } from 'react-router-dom';
import { AuthLayout, RootLayout } from './layouts';
import { SigninForm, SignupForm } from './pages/_auth';
import { Explore, Home, Profile, AllUsers, Saved } from './pages/root';
import { Toaster } from '@/components/ui/toaster';
import CreatePost from './pages/root/CreatePost';
import PostDetails from './pages/root/PostDetails';

function App() {
    return (
        <>
            <main className=" h-screen">
                <Routes>
                    <Route element={<AuthLayout />}>
                        <Route path="/sign-in" element={<SigninForm />} />
                        <Route path="/sign-up" element={<SignupForm />} />
                    </Route>
                    <Route element={<RootLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/create-post" element={<CreatePost />} />
                        <Route path="/profile/:_id" element={<Profile />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/all-users" element={<AllUsers />} />
                        <Route path="/saved" element={<Saved />} />
                        <Route path="/post/:_id" element={<PostDetails />} />
                    </Route>
                </Routes>

                <Toaster />
            </main>
        </>
    );
}

export default App;
