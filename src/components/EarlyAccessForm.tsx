
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, Loader2, Mail, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { FormSubmission, submitToGoogleSheets } from '@/utils/sheetsApi';
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
});

type FormValues = z.infer<typeof formSchema>;

const EarlyAccessForm = () => {
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
      // Create form submission object with timestamp
      const submission: FormSubmission = {
        name: data.name,
        email: data.email,
        interest: data.interest,
        timestamp: new Date().toISOString(),
      };
      
      // Submit to Google Sheets
      const result = await submitToGoogleSheets(submission);
      
      if (result) {
        console.log('Form submitted to Google Sheets:', submission);
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
      } else {
        throw new Error("Failed to submit to Google Sheets");
      }
      
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

  return (
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
  );
};

export default EarlyAccessForm;
