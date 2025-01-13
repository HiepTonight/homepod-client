import { NavHeader } from "@/components/global/nav-header"
import { Footer } from "@/components/global/footer"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getSortedPostsData } from "@/lib/posts"
import { Clock, User } from 'lucide-react'

export default function BlogPage() {
  const posts = getSortedPostsData()

  return (
    <>
      <NavHeader />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Our Blog</Badge>
            <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Latest <span className="text-primary">Insights</span> & News
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest trends and innovations in smart home technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card key={post.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <Image
                  src={`https://source.unsplash.com/800x600/?smart-home,${index}`}
                  alt={post.title}
                  width={800}
                  height={600}
                  className="object-cover h-48"
                />
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-primary hover:text-primary/80 transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="mr-2 h-4 w-4" />
                    <span className="mr-4">John Doe</span>
                    <Clock className="mr-2 h-4 w-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/blog/${post.id}`} passHref>
                    <Button variant="outline" className="w-full hover:bg-primary hover:text-white transition-colors duration-300">
                      Read More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button size="lg" variant="outline">
              Load More Articles
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

