import React from 'react';
import {Card, Skeleton} from "antd";

interface SkeletonCardProps{
    isDarkMode: String;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({isDarkMode}) => {
    return (
        <div className={'flex justify-center'}>
            <Card style={{width: 240}}
                  bodyStyle={{ padding: 0 }}
                  className={`${isDarkMode === 'dark' ? 'bg-[#141414]' : 'bg-gray-300'} border-none`}
            >
                <Skeleton.Image active={true} style={{width: 240, height: 300}}/>
                <Skeleton active={true} style={{width: 220, height: 40, margin: 10}}/>
            </Card>
        </div>
    );
};

export default SkeletonCard;