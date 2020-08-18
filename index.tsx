import * as React from 'react'

type ShufflingType = {
  loop?: number
  steps?: Array<string | number>
  time?: number
  wrapper?: any
}

async function type (node: any, ...args: any): Promise<void> {
  for (const arg of args) {
    switch (typeof arg) {
      case 'string':
        await edit(node, arg)
        break
      case 'number':
        await wait(arg)
        break
      case 'function':
        await arg(node, ...args)
        break
      default:
        await arg
    }
  }
}

async function edit (node: any, text: string) {
  // @ts-ignore
  const overlap = getOverlap(node.textContent, text)
  await perform(node, [
    // @ts-ignore
    ...deleter(node.textContent, overlap),
    // @ts-ignore
    ...writer(text, overlap),
  ])
}

async function wait (ms: number) {
  await new Promise(resolve => setTimeout(resolve, ms))
}

async function perform (
  node: any,
  edits: string[] | number[],
  speed: number = 60,
) {
  // @ts-ignore
  for (const op of editor(edits)) {
    op(node)
    await wait(speed + speed * (Math.random() - 0.5))
  }
}

function * editor (edits: string[] | number[]) {
  for (const edit of edits) {
    yield (node: any) => requestAnimationFrame(() => (node.textContent = edit))
  }
}

function * writer (
  [...text],
  startIndex = 0,
  endIndex = text.length,
): Generator<string, void, unknown> {
  while (startIndex < endIndex) {
    yield text.slice(0, ++startIndex).join('')
  }
}

function * deleter (
  [...text],
  startIndex = 0,
  endIndex = text.length,
): Generator<string, void, unknown> {
  while (endIndex > startIndex) {
    yield text.slice(0, --endIndex).join('')
  }
}

function getOverlap (start: any, [...end]) {
  return [...start, NaN].findIndex((char, i) => end[i] !== char)
}

function mergerStepAndTime (
  steps: Array<string | number>,
  time: number,
): Array<string | number> {
  return steps
    .map(step => [step, time])
    .reduce((step, arr) => arr.concat(step), [])
}

function Shuffling ({
  loop = Infinity,
  steps = ['Even', 'Odd'],
  time = 4000,
  wrapper = 'span',
}: ShufflingType) {
  steps = mergerStepAndTime(steps, time)
  const typicalRef = React.useRef(null)
  const Component = wrapper

  React.useEffect(() => {
    if (loop === Infinity) {
      type(typicalRef.current, ...steps, type)
    } else if (typeof loop === 'number') {
      type(
        typicalRef.current,
        ...Array(loop)
          .fill(steps)
          .flat(),
      )
    } else {
      type(typicalRef.current, ...steps)
    }
  }, [loop, steps])

  return <Component ref={typicalRef} />
}

Shuffling.displayName = 'Shuffling'

export default React.memo(Shuffling)
