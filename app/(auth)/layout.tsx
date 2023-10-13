import React from "react";

const AuthLayout: React.FC<React.PropsWithChildren> = ({children}) => {
    // Returned UI
    return (
        <div className='flex items-center justify-center h-full'>
            {children}
        </div>
    );
};

export default AuthLayout;