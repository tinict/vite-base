import { useState } from "react";
import {
    loginUser
} from '@/store/auth/authSlice';
import { useDispatch } from 'react-redux';
import AuthLayout from "@/layouts/AuthLayout";
import LoginForm from "@/components/forms/LoginForm";

function LoginPage() {
    const dispatch = useDispatch();
    const [citizenId, setCitizenId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        dispatch(loginUser({
            username: citizenId,
            password
        }));
    };

    return (
        <AuthLayout>
            <LoginForm
                title="Đăng nhập để tiếp tục"
                description="Vui lòng đăng nhập để truy cập vào hệ thống sức khỏe"
                citizenId={citizenId}
                setCitizenId={setCitizenId}
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                onSubmitLogin={handleLogin}
            />
        </AuthLayout>
    )
};

export default LoginPage;
