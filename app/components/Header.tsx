export default function Header() {
    return (
        <header className="relative bg-gray-900 text-white py-4 px-6 rounded-b-lg shadow-lg h-[100px]">
            <div className="flex justify-between items-center">
                {/* Logo / Tên store */}
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
                    STREETSOUL STORE
                </h1>
                {/* Tên người dùng */}
                <span className="text-sm md:text-base font-semibold bg-gray-700 px-3 py-1 rounded-lg shadow">
                    Tuấn Nhi - PS40510
                </span>
            </div>
        </header>
    );
}
