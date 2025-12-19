from fastapi import APIRouter, HTTPException
from typing import List
import feedparser
import requests
from datetime import datetime

router = APIRouter()

# RSS feeds for hip-hop news
RSS_FEEDS = {
    "hip_hop_wired": "https://feeds.feedburner.com/hhwx",
    "the_source": "https://thesource.com/feed/"
}

@router.get("/")
async def get_news():
    """
    Fetch news from various hip-hop RSS feeds and return combined articles
    """
    all_articles = []
    
    for source_name, feed_url in RSS_FEEDS.items():
        try:
            # Parse the RSS feed
            feed = feedparser.parse(feed_url)
            
            # Process each entry in the feed
            for entry in feed.entries:
                # Extract relevant information
                article = {
                    "title": entry.get("title", ""),
                    "link": entry.get("link", ""),
                    "pub_date": entry.get("published", ""),
                    "creator": entry.get("author", ""),
                    "content": entry.get("summary", ""),
                    "source": source_name,
                    "source_name": feed.feed.get("title", source_name),
                    "categories": [tag.term for tag in entry.get("tags", [])]
                }
                
                all_articles.append(article)
                
        except Exception as e:
            print(f"Error fetching from {source_name}: {str(e)}")
            # Continue with other sources even if one fails
            continue
    
    # Sort articles by publication date (most recent first)
    all_articles.sort(
        key=lambda x: datetime.fromisoformat(x["pub_date"].replace("Z", "+00:00")) 
        if x["pub_date"] else datetime.min, 
        reverse=True
    )
    
    return {"articles": all_articles}

@router.get("/sources")
async def get_news_sources():
    """
    Get information about available news sources
    """
    sources_info = []
    
    for source_name, feed_url in RSS_FEEDS.items():
        try:
            feed = feedparser.parse(feed_url)
            sources_info.append({
                "name": source_name,
                "title": feed.feed.get("title", source_name),
                "description": feed.feed.get("description", ""),
                "url": feed_url
            })
        except Exception as e:
            sources_info.append({
                "name": source_name,
                "title": source_name,
                "description": f"Error accessing feed: {str(e)}",
                "url": feed_url
            })
    
    return {"sources": sources_info}