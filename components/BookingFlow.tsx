
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, CheckCircle2, Mail, Building, User, AlertCircle, Loader2 } from 'lucide-react';

interface TimeSlot {
  time: string; // HH:mm
  label: string; // 12h format
  localTime: string; // Local HH:mm
  localLabel: string; // Local 12h format
}

type BookingStep = 'details' | 'calendar' | 'success';

interface BookingFlowProps {
  initialStep?: BookingStep;
  compact?: boolean;
}

const BookingFlow: React.FC<BookingFlowProps> = ({ compact = false }) => {
  const [step, setStep] = useState<BookingStep>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    conference: '',
    challenge: '',
    attendees: 'Under 500'
  });

  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    while (d.getDay() === 0 || d.getDay() === 6) {
      d.setDate(d.getDate() + 1);
    }
    return d;
  });

  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MEETING_DURATION = 45;
  const USER_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const ukSlots = useMemo(() => {
    const slots: string[] = [];
    let start = 8 * 60; // 08:00 AM
    const end = 20 * 60; // 08:00 PM
    while (start + MEETING_DURATION <= end) {
      const h = Math.floor(start / 60);
      const m = start % 60;
      slots.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
      start += MEETING_DURATION;
    }
    return slots;
  }, []);

  const availableSlots = useMemo(() => {
    return ukSlots.map(ukTime => {
      const [h, m] = ukTime.split(':').map(Number);
      const tempDate = new Date(selectedDate);
      tempDate.setHours(h, m, 0, 0);
      
      const labelFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: USER_TZ,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      return {
        time: ukTime,
        label: new Date(2000, 0, 1, h, m).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        localTime: ukTime,
        localLabel: labelFormatter.format(tempDate)
      };
    });
  }, [selectedDate, ukSlots, USER_TZ]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStep('success');
    setIsSubmitting(false);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - (firstDay === 0 ? 6 : firstDay - 1);
    if (day < 1 || day > daysInMonth) return null;
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
  });

  const isSelected = (date: Date) => selectedDate.toDateString() === date.toDateString();
  const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;
  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className={`bg-brand-card rounded-2xl border border-brand-border shadow-2xl relative overflow-hidden ${compact ? 'h-full max-h-[600px] overflow-y-auto' : ''}`}>
      <AnimatePresence mode="wait">
        {step === 'details' && (
          <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-brand-white">Step 1: Your Profile</h3>
              <div className="text-xs font-bold text-brand-teal bg-brand-teal/10 px-2 py-1 rounded">PART 1/2</div>
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep('calendar'); }}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-brand-muted font-bold flex items-center gap-2">
                    <User size={12} className="text-brand-teal" /> Full Name
                  </label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-brand-navy border border-brand-border rounded p-3 text-brand-white focus:border-brand-teal focus:outline-none" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-brand-muted font-bold flex items-center gap-2">
                    <Mail size={12} className="text-brand-teal" /> Work Email
                  </label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-brand-navy border border-brand-border rounded p-3 text-brand-white focus:border-brand-teal focus:outline-none" placeholder="john@company.com" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-brand-muted font-bold flex items-center gap-2">
                  <Building size={12} className="text-brand-teal" /> Organisation
                </label>
                <input type="text" required value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full bg-brand-navy border border-brand-border rounded p-3 text-brand-white focus:border-brand-teal focus:outline-none" placeholder="Company Ltd" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-brand-muted font-bold">Conference Name</label>
                  <input type="text" required value={formData.conference} onChange={(e) => setFormData({...formData, conference: e.target.value})} className="w-full bg-brand-navy border border-brand-border rounded p-3 text-brand-white focus:border-brand-teal focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-brand-muted font-bold">Scale</label>
                  <select value={formData.attendees} onChange={(e) => setFormData({...formData, attendees: e.target.value})} className="w-full bg-brand-navy border border-brand-border rounded p-3 text-brand-white focus:border-brand-teal focus:outline-none">
                    <option>Under 500</option>
                    <option>500 - 1,000</option>
                    <option>1,000 - 5,000</option>
                    <option>5,000+</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-brand-muted font-bold">Revenue Challenge</label>
                <textarea rows={2} value={formData.challenge} onChange={(e) => setFormData({...formData, challenge: e.target.value})} className="w-full bg-brand-navy border border-brand-border rounded p-3 text-brand-white focus:border-brand-teal focus:outline-none" placeholder="What are you looking to solve?"></textarea>
              </div>
              <button className="w-full bg-brand-teal text-brand-navy font-bold py-4 rounded hover:bg-white transition-all text-lg flex items-center justify-center gap-2 mt-4">
                Next: Choose a Time <ChevronRight size={20} />
              </button>
            </form>
          </motion.div>
        )}

        {step === 'calendar' && (
          <motion.div key="calendar" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6 md:p-8">
            <button onClick={() => setStep('details')} className="flex items-center gap-2 text-brand-muted hover:text-brand-teal transition-colors text-xs font-bold uppercase mb-6">
              <ChevronLeft size={14} /> Back to Details
            </button>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-brand-white font-bold text-sm">
                    {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h4>
                  <div className="flex gap-2">
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))} className="p-1 text-brand-muted hover:text-brand-teal border border-brand-border rounded"><ChevronLeft size={16} /></button>
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))} className="p-1 text-brand-muted hover:text-brand-teal border border-brand-border rounded"><ChevronRight size={16} /></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {['M','T','W','T','F','S','S'].map(d => (<div key={d} className="text-[10px] text-brand-muted font-bold py-2">{d}</div>))}
                  {calendarDays.map((date, i) => {
                    if (!date) return <div key={i} />;
                    const disabled = isWeekend(date) || isPast(date);
                    const active = isSelected(date);
                    return (
                      <button key={i} disabled={disabled} onClick={() => setSelectedDate(date)} className={`aspect-square text-xs font-medium rounded-md flex items-center justify-center transition-all ${disabled ? 'text-brand-muted/30 cursor-not-allowed' : 'text-brand-white hover:bg-brand-teal/20'} ${active ? 'bg-brand-teal text-brand-navy font-bold' : ''}`}>
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-6 p-4 bg-brand-navy/50 rounded-lg border border-brand-border">
                  <div className="flex items-center gap-2 text-brand-teal mb-1">
                    <CalendarIcon size={14} />
                    <span className="text-xs font-bold uppercase tracking-widest">Duration</span>
                  </div>
                  <p className="text-brand-white font-medium">{MEETING_DURATION} Minutes</p>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col">
                <h4 className="text-brand-white font-bold text-sm mb-4">Available Slots <span className="text-[10px] text-brand-teal ml-2">(Local)</span></h4>
                <div className="grid grid-cols-2 gap-2 max-h-[250px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-brand-border">
                  {availableSlots.map((slot, i) => (
                    <button key={i} onClick={() => setSelectedSlot(slot)} className={`p-2 text-xs font-bold rounded border transition-all ${selectedSlot?.time === slot.time ? 'bg-brand-teal border-brand-teal text-brand-navy' : 'bg-brand-navy border-brand-border text-brand-white hover:border-brand-teal'}`}>
                      {slot.localLabel}
                    </button>
                  ))}
                </div>
                <div className="mt-auto pt-6">
                  <button disabled={!selectedSlot || isSubmitting} onClick={handleBooking} className={`w-full py-4 rounded font-bold transition-all flex items-center justify-center gap-2 ${!selectedSlot || isSubmitting ? 'bg-brand-border text-brand-muted cursor-not-allowed' : 'bg-brand-teal text-brand-navy hover:bg-white'}`}>
                    {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <><Clock size={18} /> Confirm Strategy Call</>}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-12 text-center">
            <div className="w-20 h-20 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto border-2 border-brand-teal mb-6 shadow-[0_0_30px_rgba(121,243,222,0.2)]">
              <CheckCircle2 size={40} className="text-brand-teal" />
            </div>
            <h3 className="text-3xl font-bold text-brand-white mb-4">Confirmed</h3>
            <p className="text-brand-text mb-8">
              Strategy session scheduled for <span className="text-brand-teal font-bold">{selectedDate.toLocaleDateString('default', { day: 'numeric', month: 'long' })}</span> at <span className="text-brand-teal font-bold">{selectedSlot?.localLabel}</span>.
            </p>
            <div className="bg-brand-navy p-6 rounded-xl border border-brand-border text-left space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <Mail className="text-brand-teal mt-1" size={18} />
                <div>
                  <p className="text-xs font-bold text-brand-white uppercase">Calendar Invite Sent</p>
                  <p className="text-sm text-brand-muted">A meeting link has been sent to your email.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <AlertCircle className="text-brand-teal mt-1" size={18} />
                <div>
                  <p className="text-xs font-bold text-brand-white uppercase">Preparation</p>
                  <p className="text-sm text-brand-muted">Please have your last 2 years of revenue data ready.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingFlow;
