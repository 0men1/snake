import { useState } from 'react';
import {
   Card,
   CardContent, 
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';

interface MultiplayerFormProps {
   onClose: () => void;
}

const MultiplayerForm = ({ onClose }: MultiplayerFormProps) => {
   const [mode, setMode] = useState<'select' | 'online'>('select');
   const [playerName, setPlayerName] = useState('');
   const router = useRouter();

   const handleLocalPlay = () => {
       router.push('/game/local');
   };

   const handleOnlinePlay = () => {
        router.push('/game/online')
   }

//    const handleQueue = () => {
//        console.log('Queuing with name:', playerName);
//    };

   return (
       <div className="fixed inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm">
           <Card className="w-96 bg-black border border-gray-800">
               <CardHeader>
                   <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                       Multiplayer Game
                   </CardTitle>
                   <CardDescription className="text-gray-400">
                       Choose your multiplayer mode
                   </CardDescription>
               </CardHeader>

               <CardContent>
                   {mode === 'select' ? (
                       <div className="flex flex-col gap-4">
                           <Button 
                               className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
                               onClick={handleLocalPlay}
                           >
                               Local Play
                           </Button>
                           <Button 
                               className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
                               onClick={() => setMode('online')}
                           >
                               Online Play
                           </Button>
                       </div>
                   ) : (
                       <div className="flex flex-col gap-4">
                           <Input
                               type="text"
                               placeholder="Enter a username"
                               value={playerName}
                               onChange={(e) => setPlayerName(e.target.value)}
                               className="bg-gray-900 border-gray-800 text-white placeholder-gray-500"
                           />
                           <Button 
                               className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg disabled:opacity-50"
                               onClick={handleOnlinePlay}
                               disabled={!playerName.trim()}
                           >
                               Queue for Game
                           </Button>
                       </div>
                   )}
               </CardContent>

               <CardFooter>
                   <Button 
                       variant="outline"
                       onClick={onClose}
                       className="w-full border-gray-800 text-gray-400 hover:bg-gray-900"
                   >
                       Cancel
                   </Button>
               </CardFooter>
           </Card>
       </div>
   );
};

export default MultiplayerForm;