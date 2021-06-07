interface Props {
  comments: Comment[]
}

export const Comments = ({ comments }: Props) => {
  return <pre>{JSON.stringify(comments)}</pre>
}
