import { Routes, Route } from 'react-router-dom';
import { AuthLayout, RootLayout } from './layouts';
import { SigninForm, SignupForm } from './pages/_auth';
import { Home } from './pages/root';
import { Toaster } from '@/components/ui/toaster';

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
                    </Route>
                </Routes>

                <Toaster />
            </main>
        </>
    );
}

export default App;
