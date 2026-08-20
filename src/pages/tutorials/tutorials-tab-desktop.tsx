import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom';
import Tabs from '@/components/shared_ui/tabs';
import { useStore } from '@/hooks/useStore';
/* [AI] - Analytics event tracking removed - see migrate-docs/MONITORING_PACKAGES.md for re-implementation guide */
/* [/AI] */
import { TTutorialsTabItem } from './tutorials';

type TTutorialsTabDesktop = {
    tutorial_tabs: TTutorialsTabItem[];
    prev_active_tutorials: number;
};

const TutorialsTabDesktop = observer(({ tutorial_tabs, prev_active_tutorials }: TTutorialsTabDesktop) => {
    const { dashboard } = useStore();
    const navigate = useNavigate();
    const location = useLocation();

    // Create a history-like object for the Tabs component
    const history = React.useMemo(
        () => ({
            replace: (path: string) => navigate(path, { replace: true }),
            location: location,
            length: window.history.length,
            scrollRestoration: 'auto' as ScrollRestoration,
            state: null,
            back: () => navigate(-1),
            forward: () => navigate(1),
            go: (delta: number) => navigate(delta),
            pushState: () => {},
            replaceState: () => {},
        }),
        [navigate, location]
    );

    const { active_tab_tutorials, setActiveTabTutorial } = dashboard;

    return (
        <div className='dc-tabs__wrapper' data-testid='tutorials-tab-desktop'>
            <Tabs
                className={classNames('tutorials', {
                    'tutorials-guide': prev_active_tutorials === 0,
                    'tutorials-faq': prev_active_tutorials === 1,
                    'tutorials-qs-guide': prev_active_tutorials === 2,
                })}
                active_index={active_tab_tutorials}
                history={history}
                onTabItemClick={(index: number) => {
                    setActiveTabTutorial(index);
                    /* [AI] - Analytics event tracking removed - see migrate-docs/MONITORING_PACKAGES.md for re-implementation guide */
                    /* [/AI] */
                }}
                top
            >
                {tutorial_tabs?.map(({ label, content }) =>
                    content ? (
                        <div label={label} key={`${content}_${label}`}>
                            {content}
                        </div>
                    ) : null
                )}
            </Tabs>
        </div>
    );
});

export default TutorialsTabDesktop;
