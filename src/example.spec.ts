import { NotFoundException } from '@nestjs/common';
class FriendsList {
    friends = [];

    public addFriend(name: string){
        this.friends.push(name);
        this.announceFriendship(name);
    }

    public announceFriendship(name: string): void{
        global.console.log(`${name} is now a friend!`)
    }

    public removeFriend(name: string): void{
        const idx = this.friends.indexOf(name);
        if(idx === -1){
            throw new NotFoundException(`Friend not found`);
        }
        this.friends.splice(idx, 1);
    }
}

describe('FriendsList', () => {

    let friendsList;

    beforeEach(() => {
        friendsList = new FriendsList();
    });

    it('initializes friends list', () => {
        expect(friendsList.friends.length).toEqual(0);
    });

    it('adds a friend', () => {
        friendsList.addFriend('srm');
        expect(friendsList.friends.length).toEqual(1);
    });

    it('announces friendship', () => {
        friendsList.announceFriendship = jest.fn();
        expect(friendsList.announceFriendship).not.toHaveBeenCalled();
        friendsList.addFriend('srm');
        expect(friendsList.announceFriendship).toHaveBeenCalledWith('srm');
    });

    describe('removeFriend', () => {

        it('removes a friend from the list', () => {
            friendsList.addFriend('Manohar');
            expect(friendsList.friends[0]).toEqual('Manohar');
            friendsList.removeFriend('Manohar');
            expect(friendsList.friends[0]).toBeUndefined();
        });
    
        it('throws an error as friend does not exist', () => {
            expect(() => friendsList.removeFriend('Manohar')).toThrow(new NotFoundException('Friend not found'));
        });
    });
});

