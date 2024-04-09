import { icons } from '@/assets/icons';

const Loader = () => (
    <div className="flex-center w-full">
        <img src={icons.loader} alt="loader" width={24} height={24} className="animate-spin" />
    </div>
);

export default Loader;
