import React, { useState } from 'react';
import { SongRequest } from '../types';
import { INITIAL_SONG_REQUESTS } from '../data/partyData';
import { Music, ThumbsUp, Flame, Plus, Radio, Sparkles, Check, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SongJukebox: React.FC = () => {
  const [songs, setSongs] = useState<SongRequest[]>(INITIAL_SONG_REQUESTS);
  const [votedSongIds, setVotedSongIds] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newArtist, setNewArtist] = useState('');
  const [newGenre, setNewGenre] = useState('Tech House');
  const [requestedBy, setRequestedBy] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleVote = (id: string) => {
    if (votedSongIds.includes(id)) {
      // Remove vote
      setSongs(songs.map(s => s.id === id ? { ...s, votes: s.votes - 1 } : s));
      setVotedSongIds(votedSongIds.filter(vId => vId !== id));
    } else {
      // Add vote
      setSongs(songs.map(s => s.id === id ? { ...s, votes: s.votes + 1 } : s));
      setVotedSongIds([...votedSongIds, id]);
    }
  };

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newArtist.trim()) return;

    const newSong: SongRequest = {
      id: `song-${Date.now()}`,
      title: newTitle.trim(),
      artist: newArtist.trim(),
      genre: newGenre,
      requestedBy: requestedBy.trim() ? `${requestedBy.trim()} (VIP Guest)` : '18+ Passholder',
      votes: 1,
      status: 'QUEUED',
      timestamp: 'Just now'
    };

    setSongs([newSong, ...songs]);
    setVotedSongIds([...votedSongIds, newSong.id]);
    setNewTitle('');
    setNewArtist('');
    setRequestedBy('');
    setShowAddModal(false);
    setSubmittedMessage(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    setTimeout(() => setSubmittedMessage(false), 4000);
  };

  // Sort by votes descending
  const sortedSongs = [...songs].sort((a, b) => b.votes - a.votes);

  return (
    <section id="jukebox-section" className="py-16 border-t border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-fuchsia-400 uppercase mb-1">
              <Music className="w-4 h-4" />
              <span>03. AUDIENCE FREQUENCY QUEUE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">Crowd Song Jukebox</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Upvote selections or submit tracks directly into the live headline DJ performance queue.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest text-xs transition shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Request a Track</span>
          </button>
        </div>

        {/* Success Alert */}
        {submittedMessage && (
          <div className="mb-6 p-4 bg-zinc-900 border border-indigo-500 text-indigo-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>TRACK TRANSMITTED TO STAGE QUEUE. RALLY VOTES TO TRIGGER LIVE PLAY.</span>
          </div>
        )}

        {/* Modal for adding custom song */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-sm animate-fadeIn">
            <div className="bg-zinc-900 border border-zinc-700 p-6 sm:p-8 w-full max-w-md shadow-2xl">
              <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest">
                  <Music className="w-4 h-4" />
                  <span>Transmit DJ Track Request</span>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-zinc-500 hover:text-white text-xs font-mono uppercase"
                >
                  [Esc] Close
                </button>
              </div>

              <form onSubmit={handleAddSong} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Song Title <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rush / One More Time"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Artist <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Troye Sivan / Daft Punk"
                    value={newArtist}
                    onChange={(e) => setNewArtist(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300 mb-1">Genre</label>
                    <select
                      value={newGenre}
                      onChange={(e) => setNewGenre(e.target.value)}
                      className="w-full px-3 py-3 bg-zinc-950 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Tech House">Tech House</option>
                      <option value="Afrobeats">Afrobeats</option>
                      <option value="Hip-Hop">Hip-Hop / Trap</option>
                      <option value="Melodic Techno">Melodic Techno</option>
                      <option value="Dance Pop">Dance Pop</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300 mb-1">Attendee Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. Alex"
                      value={requestedBy}
                      onChange={(e) => setRequestedBy(e.target.value)}
                      className="w-full px-3 py-3 bg-zinc-950 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-zinc-400 text-xs font-mono uppercase tracking-wider border border-zinc-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest text-xs shadow-lg shadow-indigo-600/30"
                  >
                    Transmit Track
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Songs List */}
        <div className="space-y-3">
          {sortedSongs.map((song, index) => {
            const hasVoted = votedSongIds.includes(song.id);
            const isTopRanked = index === 0;

            return (
              <div
                key={song.id}
                className={`bg-zinc-900 border p-4 sm:p-5 flex items-center justify-between gap-4 transition ${
                  isTopRanked
                    ? 'border-indigo-500 bg-zinc-900 shadow-xl'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  {/* Rank number */}
                  <span className={`w-9 h-9 font-mono font-black text-xs flex items-center justify-center shrink-0 ${
                    isTopRanked
                      ? 'bg-indigo-600 text-white'
                      : 'bg-zinc-950 text-zinc-400 border border-zinc-800'
                  }`}>
                    #{index + 1}
                  </span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-tight truncate">{song.title}</h4>
                      {isTopRanked && (
                        <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-fuchsia-300 bg-zinc-950 px-2 py-0.5 border border-fuchsia-500/50 uppercase shrink-0">
                          <Flame className="w-3 h-3 text-fuchsia-400" />
                          PEAK FREQUENCY
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1 font-mono truncate">
                      <span className="font-bold text-zinc-200">{song.artist}</span>
                      <span>/</span>
                      <span className="text-[11px] text-indigo-400">{song.genre}</span>
                      <span>/</span>
                      <span className="text-[11px] text-zinc-500">{song.requestedBy}</span>
                    </div>
                  </div>
                </div>

                {/* Vote button */}
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleVote(song.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition ${
                      hasVoted
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'fill-white' : ''}`} />
                    <span>{song.votes}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
