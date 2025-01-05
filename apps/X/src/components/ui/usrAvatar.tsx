import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar() {
  return (
    <div>
      <Avatar>
        <AvatarImage src="https://github.com/mscode07.png" />
        <AvatarFallback>ON</AvatarFallback>
      </Avatar>
    </div>
  );
}
