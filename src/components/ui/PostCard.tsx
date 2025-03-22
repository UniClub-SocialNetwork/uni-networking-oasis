
import { useState } from 'react';
import { MoreHorizontal, ThumbsUp, MessageCircle, Share, Bookmark, Flag } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

type PostProps = {
  id: string;
  author: {
    name: string;
    avatar: string;
    faculty?: string;
  };
  content: string;
  image?: string;
  timeAgo: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
};

const PostCard = ({ 
  author, 
  content, 
  image, 
  timeAgo, 
  likes, 
  comments, 
  shares, 
  isLiked: initialIsLiked = false 
}: PostProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(likes);
  
  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage src={author.avatar} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{author.name}</div>
              <div className="text-xs text-muted-foreground flex items-center">
                {timeAgo}
                {author.faculty && (
                  <>
                    <span className="mx-1">•</span>
                    <span>{author.faculty}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Bookmark className="mr-2 h-4 w-4" />
                <span>Guardar publicación</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">
                <Flag className="mr-2 h-4 w-4" />
                <span>Reportar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-3 text-sm">
          <p>{content}</p>
        </div>
        
        {image && (
          <div className="mt-3">
            <img 
              src={image} 
              alt="Post content" 
              className="w-full rounded-md"
            />
          </div>
        )}
        
        <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <div className="flex items-center justify-center bg-primary text-primary-foreground rounded-full h-4 w-4 mr-1">
              <ThumbsUp className="h-2.5 w-2.5" />
            </div>
            <span>{likeCount}</span>
          </div>
          <div className="flex gap-3">
            <span>{comments} comentarios</span>
            <span>{shares} compartidos</span>
          </div>
        </div>
        
        <Separator className="my-3" />
        
        <div className="flex justify-between">
          <Button 
            variant="ghost" 
            className="flex-1 flex items-center justify-center"
            onClick={handleLike}
          >
            <ThumbsUp className={`h-5 w-5 mr-2 ${isLiked ? 'text-primary fill-primary' : ''}`} />
            <span className={isLiked ? 'text-primary' : ''}>Me gusta</span>
          </Button>
          <Button variant="ghost" className="flex-1 flex items-center justify-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            <span>Comentar</span>
          </Button>
          <Button variant="ghost" className="flex-1 flex items-center justify-center">
            <Share className="h-5 w-5 mr-2" />
            <span>Compartir</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
