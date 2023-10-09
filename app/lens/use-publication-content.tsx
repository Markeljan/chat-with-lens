'use client'

import { ProfileId, usePublications, useProfile, PublicationTypes } from '@lens-protocol/react-web';

export default function usePublicationContent({ handle }: { handle: string }) {
    const { data: profile } = useProfile({ handle: handle + '.lens' });
    const profileId = profile?.id;

    const {
        data: publications,
    } = usePublications({
        profileId: profileId as ProfileId,
        limit: 10,
        publicationTypes: [PublicationTypes.Post],
    });

    const publicationContentArray = publications?.map((publication: any) => {
        return publication.metadata.content;
    });

    // make it all one string and prefix it 'recent posts by $handle
    const publicationContentString = 'Most recent posts by ' + handle + ':\n\n' + publicationContentArray?.join(' ');

    return publicationContentString
};
