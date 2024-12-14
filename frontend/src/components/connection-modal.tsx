'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { PlusCircle, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FormData {
  host: string;
  database: string;
  user: string;
  password: string;
  port: string;
  documentation: string;
  DDL: string[];
  SQLQueries: string;
  [key: string]: string | string[];
}

interface Errors {
  [key: string]: string;
}

interface Tooltips {
  [key: string]: string;
}

interface ConnectionModalProps {
  trigger?: React.ReactNode;
}

export function ConnectionModal({ trigger }: ConnectionModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    host: '',
    database: '',
    user: '',
    password: '',
    port: '',
    documentation: '',
    DDL: [''],
    SQLQueries: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number | null = null,
    field: keyof FormData | null = null
  ) => {
    const { name, value } = e.target;
    if (index !== null && field === 'DDL') {
      setFormData((prev) => ({
        ...prev,
        [field]: (prev[field] as string[]).map((item: string, i: number) =>
          i === index ? value : item
        ),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addInput = (field: 'DDL') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ''],
    }));
  };

  const validateForm = () => {
    const newErrors: Errors = {};
    const requiredFields = ['host', 'database', 'user', 'password', 'port'];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/vanna/setup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Host: formData.host,
            Database: formData.database,
            User: formData.user,
            Password: formData.password,
            Port: formData.port,
            DDL: formData.DDL,
            Documentation: formData.documentation,
            SQLQueries: formData.SQLQueries,
          }),
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }

        console.log(data);
        router.push('/chat');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const tooltips: Tooltips = {
    host: 'The hostname or IP address of your database server',
    database: 'The name of the database you want to connect to',
    user: 'Your database username',
    password: 'Your database password',
    port: 'The port number for your database connection',
    documentation: 'Additional documentation for your database',
    DDL: 'Data Definition Language statements',
    SQLQueries: 'SQL queries to be executed',
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">New Connection</Button>}
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create connection</DialogTitle>
          <DialogDescription>
            Enter your database connection details here. Click connect when
            you’re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {(
              [
                'host',
                'database',
                'user',
                'password',
                'port',
                'documentation',
              ] as const
            ).map((field) => (
              <div key={field} className="flex flex-col gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label htmlFor={field} className="flex items-center">
                        <Info
                          className="inline-block mr-2 text-gray-400"
                          size={16}
                        />
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tooltips[field]}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Input
                  id={field}
                  name={field}
                  value={formData[field] as string}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field}`}
                  required={[
                    'host',
                    'database',
                    'user',
                    'password',
                    'port',
                  ].includes(field)}
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm">{errors[field]}</p>
                )}
              </div>
            ))}
            <div key="SQLQueries" className="space-y-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label className="flex items-center">
                      <Info
                        className="inline-block mr-2 text-gray-400"
                        size={16}
                      />
                      SQL Queries
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tooltips.SQLQueries}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Input
                value={formData.SQLQueries}
                onChange={(e) => handleInputChange(e)}
                name="SQLQueries"
                placeholder="Enter SQL Queries"
              />
            </div>
            {(['DDL'] as const).map((field) => (
              <div key={field} className="space-y-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label className="flex items-center">
                        <Info
                          className="inline-block mr-2 text-gray-400"
                          size={16}
                        />
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tooltips[field]}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {(formData[field] as string[]).map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={item}
                      onChange={(e) => handleInputChange(e, index, field)}
                      placeholder={`Enter ${field}`}
                    />
                    {index === (formData[field] as string[]).length - 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => addInput(field)}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <DialogFooter className="sm:justify-start">
            <Button type="submit">Connect</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

