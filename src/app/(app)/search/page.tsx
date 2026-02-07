"use client";
import SearchHashtag from "@/components/common/searchHashtag";
import SearchUser from "@/components/common/searchUser";
import { useSearcHashtags } from "@/hooks/search/useSearchHahtags";
import { useSearchPeople } from "@/hooks/search/useSearchPeople";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchPage = () => {
  const search = useSearchParams().get("q") ?? "";
  const [inputValue, setInputValue] = useState(search);
  const [searchQuery, setSearchQuery] = useState(search);

  const {
    users,
    isLoading: isUserLoading,
    fetchNextPage: fetchUserNextPage,
    hasNextPage: hasUserNextPage,
    isFetchingNextPage: isUserFetchingNextPage,
  } = useSearchPeople(searchQuery);

  const {
    hashtags,
    isLoading: isHashtagLoading,
    fetchNextPage: fetchHashtagNextPage,
    hasNextPage: hasHashtagNextPage,
    isFetchingNextPage: isHashtagFetchingNextPage,
  } = useSearcHashtags(searchQuery);

  const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchQuery(inputValue.trim());
    }
  };

  return (
    <Card className="mt-3">
      <CardHeader className="flex flex-col items-start">
        <Input
          placeholder="search something..."
          className="mt-2"
          value={inputValue}
          onInput={changeSearchValue}
          onKeyDown={handleSearchValue}
        />
        <Divider className="mt-2" />
      </CardHeader>
      <CardBody>
        <div className="w-full">
          <div className="text-[18px]">People</div>
          <div className="flex flex-col gap-2">
            {!!users &&
              users.map((user) => <SearchUser user={user} key={user.id} />)}
          </div>
          {!isUserLoading && (
            <Button
              className="mt-2 w-full"
              onPress={() => fetchUserNextPage()}
              isLoading={isUserFetchingNextPage}
              disabled={!hasUserNextPage}
            >
              {hasUserNextPage ? "Find more users" : "No more users"}
            </Button>
          )}
        </div>

        <Divider className="mt-2" />

        <div className="w-full mt-3">
          <div className="text-[18px]">Hahtags</div>
          <div className="flex flex-col gap-2">
            {!!hashtags &&
              hashtags.map((hashtag) => (
                <SearchHashtag hashtag={hashtag} key={hashtag.id} />
              ))}
          </div>
          {!isHashtagLoading && (
            <Button
              className="mt-2 w-full"
              onPress={() => fetchHashtagNextPage()}
              isLoading={isHashtagFetchingNextPage}
              disabled={!hasHashtagNextPage}
            >
              {hasHashtagNextPage ? "Find more hashtags" : "No more hashtags"}
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default SearchPage;
