
import Link from 'next/link';
import { 
  Shield, 
  Database, 
  Zap, 
  Globe, 
  Code, 
  Server,
  Users,
  UserCheck,
  GitBranch,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function Home() {
  const techStack = [
    {
      category: 'Backend',
      items: [
        { name: 'Django 4.2.7', icon: Server, description: 'Robust web framework' },
        { name: 'Django REST Framework 3.14.0', icon: Globe, description: 'API development' },
        { name: 'JWT Authentication', icon: Shield, description: 'Secure token-based auth' },
        { name: 'SQLite/PostgreSQL', icon: Database, description: 'Reliable data storage' },
      ]
    },
    {
      category: 'Frontend',
      items: [
        { name: 'Next.js 15', icon: Code, description: 'React framework' },
        { name: 'TypeScript', icon: Code, description: 'Type-safe development' },
        { name: 'Tailwind CSS', icon: Zap, description: 'Utility-first styling' },
        { name: 'React Hook Form', icon: Code, description: 'Form management' },
      ]
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'Patient Management',
      description: 'Complete CRUD operations for patient records with detailed medical information.',
      items: ['Personal information', 'Medical history', 'Contact details', 'Blood type & allergies']
    },
    {
      icon: UserCheck,
      title: 'Doctor Management',
      description: 'Comprehensive doctor profiles with specializations and clinic information.',
      items: ['Professional credentials', 'Specializations', 'Clinic details', 'Availability status']
    },
    {
      icon: GitBranch,
      title: 'Patient-Doctor Mapping',
      description: 'Efficient assignment and management of patient-doctor relationships.',
      items: ['Assignment tracking', 'Status management', 'Consultation notes', 'Relationship history']
    },
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'JWT-based authentication with proper user isolation and data protection.',
      items: ['JWT tokens', 'User isolation', 'Protected endpoints', 'Session management']
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Healthcare Management System
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              A comprehensive solution for managing patients, doctors, and medical relationships
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/login">
                <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-400">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage your healthcare operations efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="h-full">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center text-sm text-gray-500">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technology Stack
            </h2>
            <p className="text-xl text-gray-600">
              Built with modern, reliable technologies for optimal performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {techStack.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.items.map((tech, techIndex) => {
                    const Icon = tech.icon;
                    return (
                      <Card key={techIndex}>
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <Icon className="h-8 w-8 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">
                              {tech.name}
                            </h4>
                            <p className="text-gray-600">
                              {tech.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* API Status Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              API Status
            </h2>
            <p className="text-xl text-gray-600">
              All backend services are fully operational
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Authentication APIs',
              'Patient Management',
              'Doctor Management',
              'Patient-Doctor Mapping'
            ].map((service, index) => (
              <Card key={index}>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    100% Functional
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our healthcare management system today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
