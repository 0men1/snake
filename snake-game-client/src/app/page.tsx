import MenuCard from '@/components/menu/MenuCard';

const GameMenu: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-6xl font-bold text-white mb-4">Snake Game</h1>
        <p className="text-gray-400 text-xl">Choose your game mode</p>
      </div>

      <MenuCard />

      <div className="absolute bottom-8 text-gray-500 text-sm">
        <p>Controls: Arrow keys or WASD to move</p>
      </div>
    </div>

  );
};

export default GameMenu;