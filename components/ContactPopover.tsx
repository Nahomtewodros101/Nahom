import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { FormEvent, useState } from "react";

const ContactPopover = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ email, message }); 
    setEmail("");
    setMessage("");
    setIsOpen(false); 
  };

  return (
    <div className="flex items-center space-x-4">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            className="hidden md:flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full text-sm font-medium"
            onClick={() => setIsOpen(true)}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={16} />
            </motion.span>
            <span>Contact Me</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80 bg-gray-900/95 border border-purple-900/50 rounded-xl p-6 shadow-lg shadow-purple-500/20"
          sideOffset={8}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <h3 className="text-lg font-semibold text-purple-400 mb-4">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm text-gray-300 block mb-1"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-gray-800 border-purple-900/50 text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-sm text-gray-300 block mb-1"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message..."
                  className="bg-gray-800 border-purple-900/50 text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500 h-24"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center gap-2"
              >
                <Send size={16} />
                Send Message
              </Button>
            </form>
          </motion.div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ContactPopover;
