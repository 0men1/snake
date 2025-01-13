'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Gamepad2, Users, Brain } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MultiplayerForm from './MultiplayerForm';

type GameMode = 'single' | 'multiplayer' | 'ai' | null;

interface MenuButtonProps {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link';
}

interface GameModeDescription {
  text: string;
  icon: React.ReactNode;
  variant: MenuButtonProps['variant'];
  description: string;
}

const gameModeConfigs: Record<Exclude<GameMode, null>, GameModeDescription> = {
  single: {
    text: "Single Player",
    icon: <Gamepad2 className="w-5 h-5" />,
    variant: "default",
    description: "Classic snake game - eat food, grow longer, don't hit the walls!"
  },
  multiplayer: {
    text: "Multiplayer",
    icon: <Users className="w-5 h-5" />,
    variant: "secondary",
    description: "Challenge your friends in real-time multiplayer matches!"
  },
  ai: {
    text: "AI Battle",
    icon: <Brain className="w-5 h-5" />,
    variant: "outline",
    description: "Test your skills against an AI-controlled opponent!"
  }
};

const MenuButton: React.FC<MenuButtonProps> = ({
  text,
  icon,
  onClick,
  variant = "default"
}) => (
  <Button
    variant={variant}
    size="lg"
    onClick={onClick}
    className="w-64 h-16 text-lg font-semibold transition-all duration-200 hover:scale-105">
    {icon}
    <span className="ml-2">{text}</span>
  </Button>
);

const MenuCard: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<GameMode>(null);
  const [showMultiplayerForm, setShowMultiplayerForm] = useState(false);
  const router = useRouter();

  const handleModeSelect = (mode: Exclude<GameMode, null>) => {
    setSelectedMode(mode);
    switch(mode) {
      case "single":
        router.push('/game/solo/');
        break;
      case 'multiplayer':
        setShowMultiplayerForm(true);
        break;
    }
  };

  return (
    <>
      <div className="bg-gray-800/50 p-8 rounded-lg backdrop-blur-sm border border-gray-700">
        <div className="flex flex-col items-center space-y-6">
          {(Object.entries(gameModeConfigs) as [Exclude<GameMode, null>, GameModeDescription][]).map(([mode, config]) => (
            <MenuButton
              key={mode}
              text={config.text}
              icon={config.icon}
              onClick={() => handleModeSelect(mode)}
              variant={config.variant}
            />
          ))}
        </div>
        <div className="mt-8 text-center text-gray-400 h-16 px-4 transition-all duration-200">
          {selectedMode && gameModeConfigs[selectedMode].description}
        </div>
      </div>
      {showMultiplayerForm && (
        <MultiplayerForm onClose={() => setShowMultiplayerForm(false)} />
      )}
    </>
  );
};

export default MenuCard