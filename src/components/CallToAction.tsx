import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, Loader2, Mail, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  interest: z.string({ required_error: 'Please select an area of interest' }),
  feedback: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CallToAction = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      interest: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/mjkylrkb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Form submission failed');
      }
      
      setIsSuccess(true);
      
      toast({
        title: "Registration successful!",
        description: "You've been added to our early access list.",
        variant: "default",
      });
      
      // Reset form after delay
      setTimeout(() => {
        form.reset();
        setIsSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('.reveal-on-scroll');
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('revealed');
            }, 100 * index);
          });
        }
      });
    }, observerOptions);

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  return (
    <section
      id="contact"
      ref={ctaRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-liberation-50 opacity-50 transform -skew-y-6"></div>
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative">
        <div className="bg-white rounded-2xl shadow-elevated p-8 md:p-12 overflow-hidden relative glass-morph">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-liberation-100 filter blur-3xl opacity-70"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-blue-100 filter blur-3xl opacity-70"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <div className="inline-block py-1 px-3 rounded-full bg-liberation-100 text-liberation-700 text-xs font-medium tracking-wide mb-4 reveal-on-scroll">
                Join Us
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal-on-scroll">
                Breaking barriers, <br />one motion at a time
              </h2>
              
              <p className="text-gray-600 max-w-xl mx-auto reveal-on-scroll">
                Be among the first to experience Liberate and help shape the future of accessibility technology. Share your feedback so we can improve the product.
              </p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4 reveal-on-scroll">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              placeholder="Your Name"
                              className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-liberation-500 focus:border-liberation-500 transition-all duration-200"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs mt-1" />
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              type="email"
                              placeholder="Your Email"
                              className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-liberation-500 focus:border-liberation-500 transition-all duration-200"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs mt-1" />
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="interest"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormControl>
                          <select
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-liberation-500 focus:border-liberation-500 transition-all duration-200"
                            {...field}
                            defaultValue=""
                          >
                            <option value="" disabled>I'm interested in...</option>
                            <option value="personal">Personal use</option>
                            <option value="professional">Professional/Medical use</option>
                            <option value="research">Research collaboration</option>
                            <option value="investment">Investment opportunity</option>
                          </select>
                        </FormControl>
                        <FormMessage className="text-xs mt-1" />
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormControl>
                          <textarea
                            placeholder="Any feedback or suggestions? (optional)"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-liberation-500 focus:border-liberation-500 transition-all duration-200 min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs mt-1" />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`w-full bg-liberation-500 hover:bg-liberation-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm ${isSuccess ? 'bg-green-500 hover:bg-green-500' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Registration Complete
                    </>
                  ) : (
                    'Get Early Access'
                  )}
                </Button>
                
                <p className="text-xs text-center text-gray-500 mt-4">
                  By signing up, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
