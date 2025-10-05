//task 1
function processId(id: string | number) {
  if (typeof id === 'string') {
    return id.toUpperCase();
  } else {
    return `ID число: ${id}`;
  }
}
console.log(processId(5));
console.log(processId('blabla'));
// task 2
type AnimationStatus = 'playing' | 'paused' | 'stopped';
function controlAnimation(status: AnimationStatus) {
  switch (status) {
    case 'paused':
      return 'animation paused';
    case 'playing':
      return 'animation is playing';
    case 'stopped':
      return 'animation stopped';
  }
}

console.log(controlAnimation('paused'));
// task 3
enum UserRole {
  Admin,
  Moderator,
  User,
}
interface Profile {
  username: string;
  role: UserRole;
}
const myProfile: Profile = {
  username: 'rozeraf',
  role: UserRole.Admin,
};

function canEdit(profile: Profile): boolean {
  return profile.role === UserRole.Admin || profile.role === UserRole.Moderator;
}
console.log(canEdit(myProfile));
