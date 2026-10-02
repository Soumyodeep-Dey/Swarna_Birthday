// A soft, locally synthesized birthday melody: no external audio download.
const tune: [number, number][] = [
  [67,.5],[67,.5],[69,1],[67,1],[72,1],[71,2],
  [67,.5],[67,.5],[69,1],[67,1],[74,1],[72,2],
  [67,.5],[67,.5],[79,1],[76,1],[72,1],[71,1],[69,2],
  [77,.5],[77,.5],[76,1],[72,1],[74,1],[72,2]
];
const beat = .52;
const duration = tune.reduce((total,[,beats]) => total + beats * beat, 0) + 4;

class BirthdayMusic {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private nextPhrase = 0;
  private track: HTMLAudioElement | null;

  constructor(url?: string) {
    this.track = url ? new Audio(url) : null;
    if (this.track) { this.track.loop = true; this.track.volume = .35; }
  }

  async play() {
    if (this.track) { await this.track.play(); return; }
    if (!this.context) {
      this.context = new AudioContext();
      this.master = this.context.createGain();
      this.master.gain.value = .22;
      this.master.connect(this.context.destination);
    }
    await this.context.resume();
    if (this.context.state !== 'running') throw new Error('Audio needs a tap to start');
    if (this.timer) return;
    if (this.nextPhrase === 0) this.nextPhrase = this.context.currentTime + .1;
    this.schedule();
    this.timer = setInterval(() => this.schedule(), 1000);
  }

  pause() {
    if (this.track) { this.track.pause(); return; }
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    // Keep scheduled notes in place so resuming continues the same phrase.
    void this.context?.suspend();
  }

  private schedule() {
    if (!this.context || this.nextPhrase > this.context.currentTime + 2) return;
    let start = this.nextPhrase;
    for (const [note, beats] of tune) {
      this.note(note, start, beats * beat, .3);
      start += beats * beat;
    }
    const chords = [[48,52,55],[43,50,55],[48,52,55],[53,57,60],[48,52,55],[43,50,55],[48,52,55]];
    chords.forEach((chord,i) => chord.forEach(note => this.note(note, this.nextPhrase + i*4*beat, 3.7*beat, .045)));
    this.nextPhrase += duration;
  }

  private note(midi: number, start: number, length: number, volume: number) {
    const context = this.context!;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.type = 'triangle';
    oscillator.frequency.value = 440 * 2 ** ((midi-69)/12);
    envelope.gain.setValueAtTime(0, start);
    envelope.gain.linearRampToValueAtTime(volume, start+.025);
    envelope.gain.exponentialRampToValueAtTime(.001, start+length+.35);
    oscillator.connect(envelope);
    envelope.connect(this.master!);
    oscillator.start(start);
    oscillator.stop(start+length+.4);
    oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); };
  }
}

const customTrack = Object.keys(import.meta.glob('/public/music/*.{mp3,m4a,ogg,wav}', { eager: true })).sort()[0]?.replace('/public', '');
export const birthdayMusic = new BirthdayMusic(customTrack);
