
import { Card, CardContent, CardDescription, CardTitle }  from 'keep-react'

export const CardComponent = ({title, description, image, price}) => {
  return (
    <Card className="max-w-md">
      <CardContent>
        <img src={image} alt={title} className="w-full h-48 object-cover mb-4" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
        <p className="text-2xl font-bold">${price}</p>
      </CardContent>
    </Card>
  )
}
