import Dashboard from '@/components/UserDashboard/Dashboard';

const layout = ({ children }) => {

    return (
        <div>
           <Dashboard>
            {children}
           </Dashboard>
        </div>
    );
};

export default layout;