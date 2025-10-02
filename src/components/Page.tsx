import React from 'react';
import image1 from "../assets/blogb.jpg";
import image2 from '../assets/blogc.jpg';

import { Check, Truck, Headphones, RotateCcw, Monitor, Zap, BarChart3, Edit, Headset, Code, Star } from 'lucide-react';

const KapeePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* About Kapee Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={image1} 
                alt="About Kapee illustration" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Right Column - Content */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Kapee</h1>
            <p className="text-sm text-blue-600 mb-6">Welcome to kapee theme</p>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis consequat justo, 
              ac consectetur elit. Nam non mauris ut libero eleifend lacinia in leo suscipit. Sed commodo diam, 
              lorem quis consectetur fermentum hendrerit. Morbi pulvinar hendrerit lorem. Maecenas 
              tristique consectetur elit ut aliquam ut, interdum elit sagittis consectetur, lorem ut 
              lacus varius odio.
            </p>
            
            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Lorem ipsum dolor sit amet.</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Lorem ipsum dolor sit amet.</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Integer tempor mauris faucibus.</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Integer tempor mauris faucibus.</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Sed molestus euismod elit quis.</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Sed molestus euismod elit quis.</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Why Choose Us Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-20">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-sm text-gray-600 mb-8">Lorem ipsum dolor adipiscing elit.</p>
            
            <p className="text-gray-600 mb-12 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac placerat tristique, 
              vestibulum et ipsum sit amet, aliquam sit rhoncus in malesuada tellus et ante. Donec tempor id 
              faucibus. Duis rhoncus lorem eros eros tincidunt, et tempor metus tristique. Quisque 
              molestie elit ex nibh tempor cursus.
            </p>
            
            {/* Service Features */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Truck className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Free Shipping</h3>
                  <p className="text-sm text-gray-600">
                    Praesent Sed Porttitor Lacuus. Integer Molestie Vehicula Porttitor In Vehicula. 
                    Ante At Gravida Laorris. Lorem Augue Sodales Erat. Vitae Vestibulum Arcu Urna Vel 
                    Justo. Quisque Sed Arcu Aliquam Nulls.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Headphones className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                  <p className="text-sm text-gray-600">
                    Praesent Sed Porttitor Lacuus. Integer Molestie Vehicula Porttitor In Vehicula. 
                    Ante At Gravida Laorris. Lorem Augue Sodales Erat. Vitae Vestibulum Arcu Urna Vel 
                    Justo. Quisque Sed Arcu Aliquam Nulls.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <RotateCcw className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">30 Days Returns</h3>
                  <p className="text-sm text-gray-600">
                    Praesent Sed Porttitor Lacuus. Integer Molestie Vehicula Porttitor In Vehicula. 
                    Ante At Gravida Laorris. Lorem Augue Sodales Erat. Vitae Vestibulum Arcu Urna Vel 
                    Justo. Quisque Sed Arcu Aliquam Nulls.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={image2} 
                alt="Person with travel bags and accessories" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Kapee Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm text-red-400 mb-2">BEST FEATURES</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Kapee Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Vivamus tortor velit, porta quis mauris ut quam, aliquam non mauris euismod lorem. 
              Lorem mollis elit ex vestibulum eleifend consectetur tristique.
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fully Responsive</h3>
              <p className="text-sm text-gray-600">
                Pellentesque Maximus Mattis Ullamcorper Nam 
                Feugiat Neque Placerat. Mattis Odio Tellus Aliquam 
                Suscipit Mattis Cursus Non Eleifd Quam.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fastest Page Load</h3>
              <p className="text-sm text-gray-600">
                Pellentesque Maximus Mattis Ullamcorper Nam 
                Feugiat Neque Placerat. Mattis Odio Tellus Aliquam 
                Suscipit Mattis Cursus Non Eleifd Quam.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">SEO Base Built-In</h3>
              <p className="text-sm text-gray-600">
                Pellentesque Maximus Mattis Ullamcorper Nam 
                Feugiat Neque Placerat. Mattis Odio Tellus Aliquam 
                Suscipit Mattis Cursus Non Eleifd Quam.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Edit className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Translation & RTL Ready</h3>
              <p className="text-sm text-gray-600">
                Pellentesque Maximus Mattis Ullamcorper Nam 
                Feugiat Neque Placerat. Mattis Odio Tellus Aliquam 
                Suscipit Mattis Cursus Non Eleifd Quam.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Headset className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Dedicated Support</h3>
              <p className="text-sm text-gray-600">
                Pellentesque Maximus Mattis Ullamcorper Nam 
                Feugiat Neque Placerat. Mattis Odio Tellus Aliquam 
                Suscipit Mattis Cursus Non Eleifd Quam.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No Coding Skills Required</h3>
              <p className="text-sm text-gray-600">
                Pellentesque Maximus Mattis Ullamcorper Nam 
                Feugiat Neque Placerat. Mattis Odio Tellus Aliquam 
                Suscipit Mattis Cursus Non Eleifd Quam.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm text-red-400 mb-2">OUR TESTIMONIAL</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Vivamus tortor velit, porta quis mauris ut quam, aliquam non mauris euismod lorem. 
              Lorem mollis elit ex vestibulum eleifend consectetur tristique.
            </p>
          </div>
          
          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Praesent quis porttitor lectus. Integer molestie 
                vehicula porttitor in vehicula, ante at lacinia lorem 
                augue sodales vestibulum arcu augue.
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Alexander Alex</h4>
                  <p className="text-sm text-gray-500">Founder</p>
                  <div className="flex space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gray-900 text-gray-900" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Praesent quis porttitor lectus. Integer molestie 
                vehicula porttitor in vehicula, ante at lacinia lorem 
                augue sodales vestibulum arcu augue.
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Melissa Smith</h4>
                  <p className="text-sm text-gray-500">Director</p>
                  <div className="flex space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gray-900 text-gray-900" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Praesent quis porttitor lectus. Integer molestie 
                vehicula porttitor in vehicula, ante at lacinia lorem 
                augue sodales vestibulum arcu augue.
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Theo Lee</h4>
                  <p className="text-sm text-gray-500">CEO</p>
                  <div className="flex space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-red-400 text-red-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KapeePage;