import { reactive, ref } from 'vue'

const apiKey = import.meta.env.VITE_DOG_API_KEY as string

type BreedImage = {
  width: number,
  height: number,
  url: string,
}

type Breed = {
  weight: {
    imperial: string,
  },
  height: {
    imperial: string,
  },
  id: number,
  name: string,
  bred_for: string,
  breed_group: string,
  life_span: string,
  temperament: string,
  origin: string,
  image: BreedImage,
}

interface UseDogBreedsReturnType {
  breeds: Breed[],
  request: () => Promise<void>,
  loadMore: () => Promise<void>,
}

// I love custom hooks, especially in React. It is one of the best ways to extract reusable logic.
// I see Vue handles re-renders a bit differently, so there may be a more idiomatic way to
// construct a custom hook (provide/inject?) depending on how
export function useDogBreedsApi(): UseDogBreedsReturnType {
  const breeds: Breed[] = reactive([])
  const page = ref(1)
  // Get 24 per load, so we have an even number coming back which looks best for two row.
  // We would usually handle disabling the button, or something to that extent, when
  // the last page was fetched, but there are a ton of pages, so I am leaving
  // this out here. However, if we need to do that, we would get that data
  // from the headers of the response.
  //
  // p.s. Had to make this (`url`) a functions so that it would be re-evaluated each time and force the hook
  // to fetch again. This is one of those things where, in React, I would have used "useCallback",
  // and `page` would have been a dependency of "useCallback" which means when `page`'s value
  // was changed, the "request" function below would have been re-evaluated and run again.
  // Vue seems to work a bit differently and I need to learn more about the render process.
  const url = (): string => `https://api.thedogapi.com/v1/breeds?page=${page.value}&limit=24`

  const request = async (): Promise<void> => {
    const res = await fetch(url(), {
      mode: 'cors',
      headers: {
        'x-api-key': apiKey,
      },
    })
    const data = await res.json()
    breeds.push(...data)
  }

  async function loadMore(): Promise<void> {
    page.value = page.value + 1
    await request()
  }

  return {
    breeds,
    request,
    loadMore,
  }
}
