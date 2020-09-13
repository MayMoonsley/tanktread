import { DefaultMessagePipe } from './default-message.pipe';

describe('DefaultMessagePipe', () => {
    it('create an instance', () => {
        const pipe = new DefaultMessagePipe();
        expect(pipe).toBeTruthy();
    });
});
