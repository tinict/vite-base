export default function AuthLayout({
    children
}) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="flex-1 flex flex-col justify-center items-center p-8">
                {children}
            </div>

            <div className="hidden lg:block lg:flex-1 bg-gray-100 relative">
                <div className="absolute inset-0 bg-cover bg-center">
                    <img
                        src="https://bvtwhue.com.vn/upload/images/Da%20Chinh%20Sua%20lan%202%20BVTW%20HUE%20%20(1).jpg"
                        alt="Healthcare"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#4a567f] bg-opacity-50 flex flex-col justify-center items-center text-white p-8">
                        <h2 className="text-3xl font-bold mb-4 text-center">
                            Chào mừng khách hàng đến với <br /> BỆNH VIỆN TRUNG ƯƠNG HUẾ
                        </h2>
                        <p className="text-lg max-w-md text-center mb-8">
                            Đăng nhập để truy cập thông tin y tế cá nhân và đặt lịch khám bệnh một cách dễ dàng
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
