import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const Contact = () => {
  const [form,    setForm]    = useState({ name: '', email: '', subject: '', message: '' });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (f) => (e) => {
    setForm(p => ({ ...p, [f]: e.target.value }));
    setErrors(er => ({ ...er, [f]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email)          e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 20)  e.message = 'Message too short (min 20 chars)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await api.post('/contact', form);
      setSuccess(true);
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const info = [
    { icon: '📍', title: 'Address', text: '123 Paw Street, Pet City, USA 10001' },
    { icon: '📞', title: 'Phone',   text: '+1 (123) 456-7890'                   },
    { icon: '✉️', title: 'Email',   text: 'hello@pawmart.com'                   },
    { icon: '🕐', title: 'Hours',   text: 'Mon – Fri: 9AM – 6PM EST'            },
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-primary to-sky-700 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-3">Get in Touch</h1>
        <p className="text-white/80 text-lg max-w-xl mx-auto">
          Have a question? We&apos;d love to hear from you. Send us a message
          and we&apos;ll respond within 24 hours.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="space-y-5">
          <h2 className="text-xl font-bold">Contact Information</h2>
          {info.map(i => (
            <div
              key={i.title}
              className="flex items-start gap-4 p-4 bg-base-200 rounded-2xl"
            >
              <span className="text-2xl">{i.icon}</span>
              <div>
                <p className="font-semibold text-sm">{i.title}</p>
                <p className="text-sm text-base-content/60">{i.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          {success ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-base-content/60 mb-6">
                Thank you for reaching out. We&apos;ll respond within 24 hours.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="btn btn-primary"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="card bg-base-100 shadow-md p-8">
              <h2 className="text-xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { name: 'name',  label: 'Full Name', type: 'text',  placeholder: 'John Doe'          },
                    { name: 'email', label: 'Email',     type: 'email', placeholder: 'you@example.com'   },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-sm font-medium mb-1.5">
                        {f.label} <span className="text-error">*</span>
                      </label>
                      <input
                        type={f.type}
                        value={form[f.name]}
                        onChange={update(f.name)}
                        placeholder={f.placeholder}
                        className={`input-field ${errors[f.name] ? 'border-error' : ''}`}
                      />
                      {errors[f.name] && (
                        <p className="text-xs text-error mt-1">{errors[f.name]}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Subject <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={update('subject')}
                    placeholder="How can we help?"
                    className={`input-field ${errors.subject ? 'border-error' : ''}`}
                  />
                  {errors.subject && (
                    <p className="text-xs text-error mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Message <span className="text-error">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Tell us what is on your mind..."
                    className={`input-field resize-none ${errors.message ? 'border-error' : ''}`}
                  />
                  {errors.message && (
                    <p className="text-xs text-error mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={loading}
                >
                  {loading
                    ? <span className="loading loading-spinner loading-sm" />
                    : '✉️ Send Message'
                  }
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;