// @ts-nocheck — vendored bot code with known upstream type gaps; see AGENTS.md
import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import SelectNative from '@/components/shared_ui/select-native';
import { useStore } from '@/hooks/useStore';
import { TTutorialsTabItem } from './tutorials';

type TListItem = {
    id: string;
    value: string;
    text: string;
};

type TTutorialsTabMobile = {
    tutorial_tabs: TTutorialsTabItem[];
    prev_active_tutorials: number;
};

const TutorialsTabMobile = observer(({ tutorial_tabs, prev_active_tutorials }: TTutorialsTabMobile) => {
    const { dashboard } = useStore();
    const { active_tab_tutorials, setActiveTabTutorial } = dashboard;

    const initialSelectedTab: TTutorialsTabItem = { label: '', content: undefined };
    const [selectedTab, setSelectedTab] = React.useState(initialSelectedTab);
    const scroll_ref = React.useRef<HTMLDivElement & SVGSVGElement>(null);

    React.useEffect(() => {
        setSelectedTab(tutorial_tabs[active_tab_tutorials] || {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tutorial_tabs]);

    const scrollToTop = () => {
        if (scroll_ref.current) {
            scroll_ref.current.scrollTop = 0;
        }
    };

    const onChangeHandle = React.useCallback(
        ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
            const index = tutorial_tabs.findIndex(i => i.label === target.value);
            setActiveTabTutorial(index);

            /* [AI] - Analytics event tracking removed - see migrate-docs/MONITORING_PACKAGES.md for re-implementation guide */
            /* [/AI] */
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [active_tab_tutorials]
    );

    return (
        <div className='tutorials-mobile' data-testid='test-tutorials-mobile'>
            <div className='tutorials-mobile__select' data-testid='id-tutorials-selector'>
                <SelectNative
                    data_testid='id-tutorials-select'
                    className='dc-tabs__wrapper__group__search-input--active'
                    list_items={
                        tutorial_tabs.map(({ label }, idx) => ({
                            id: idx.toString(),
                            value: label,
                            text: label,
                        })) as TListItem[]
                    }
                    value={selectedTab.label}
                    label=''
                    should_show_empty_option={false}
                    onChange={e => {
                        onChangeHandle(e);
                        scrollToTop();
                    }}
                />
            </div>
            <div
                className={classNames({
                    'tutorials-mobile__guide': active_tab_tutorials === 0,
                    'tutorials-mobile__faq': active_tab_tutorials === 1,
                    'tutorials-mobile__qs-guide': active_tab_tutorials === 2,
                })}
                ref={scroll_ref}
            >
                {selectedTab.content}
            </div>
        </div>
    );
});

export default TutorialsTabMobile;
