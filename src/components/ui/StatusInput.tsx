
import { useState } from 'react';
import { Camera, Video, Smile } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const StatusInput = () => {
  const [status, setStatus] = useState('');

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="https://placehold.co/100x100?text=Me" />
            <AvatarFallback>Me</AvatarFallback>
          </Avatar>
          <div 
            className="flex-1 bg-secondary rounded-full px-4 py-2 cursor-text"
            onClick={() => document.getElementById('status-input')?.focus()}
          >
            <input
              id="status-input"
              className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
              placeholder="¿Qué estás pensando, Rodrigo?"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
        </div>
        
        <Separator className="my-3" />
        
        <div className="flex justify-between">
          <Button variant="ghost" className="flex-1 flex items-center justify-center">
            <Video className="h-5 w-5 mr-2 text-red-500" />
            <span>Video en directo</span>
          </Button>
          <Button variant="ghost" className="flex-1 flex items-center justify-center">
            <Camera className="h-5 w-5 mr-2 text-green-500" />
            <span>Foto/video</span>
          </Button>
          <Button variant="ghost" className="flex-1 flex items-center justify-center">
            <Smile className="h-5 w-5 mr-2 text-yellow-500" />
            <span>Sentimiento</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusInput;
