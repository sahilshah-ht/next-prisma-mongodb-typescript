export const MainLoader = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="relative">
                <div className="h-16 w-16 rounded-full "></div>
                <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-lime-500 animate-spin">
                </div>
            </div>
        </div>
    );
}

