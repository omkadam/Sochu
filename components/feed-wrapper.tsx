type Props = {
    children: React.ReactNode;
    className?: string;  // Allow className as an optional prop
};

export const FeedWrapper = ({ children, className = "" }: Props) => {
    return (
        <div className={`flex-1 relative top-0 pb-10 ${className}`}>
            {children}
        </div>
    );
};
